import { Request, Response } from "express";

import {
  CourseDepartmentModel,
  CourseModel,
  CoursePrerequisiteModel,
  DepartmentModel,
} from "@fcai-sis/shared-models";

type HandlerRequest = Request<
  {},
  {},
  {},
  {
    skip?: number;
    limit?: number;
    department?: string;
  }
>;

/**
 * Get all courses.
 */
const fetchPaginatedCoursesHandler = async (
  req: HandlerRequest,
  res: Response
) => {
  const { skip, limit, department } = req.query;

  const departmentQuery = department
    ? await DepartmentModel.findOne({
        code: department,
      })
    : null;

  const courses = await CourseModel.aggregate([
    // if skip and limit are provided, use them
    {
      $skip: req.skip ?? 0,
    },
    ...(limit ? [{ $limit: limit }] : []),
    {
      $lookup: {
        from: CourseDepartmentModel.collection.name,
        localField: "_id",
        foreignField: "course",
        as: "courseDepartments",
      },
    },
    {
      $unwind: {
        path: "$courseDepartments",
        preserveNullAndEmptyArrays: true,
      },
    },
    // if department is provided, filter by department
    ...(departmentQuery
      ? [
          {
            $match: {
              "courseDepartments.department": departmentQuery._id,
            },
          },
        ]
      : []),
    {
      $lookup: {
        from: DepartmentModel.collection.name,
        localField: "courseDepartments.department",
        foreignField: "_id",
        as: "department",
      },
    },
    {
      $unwind: {
        path: "$department",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        code: { $first: "$code" },
        name: { $first: "$name" },
        description: { $first: "$description" },
        creditHours: { $first: "$creditHours" },
        departments: { $push: "$department" },
      },
    },
    {
      $lookup: {
        from: CoursePrerequisiteModel.collection.name,
        localField: "_id",
        foreignField: "course",
        as: "coursePrerequisites",
      },
    },
    {
      $unwind: {
        path: "$coursePrerequisites",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: CourseModel.collection.name,
        localField: "coursePrerequisites.prerequisite",
        foreignField: "_id",
        as: "prerequisite",
      },
    },
    {
      $unwind: {
        path: "$prerequisite",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        code: { $first: "$code" },
        name: { $first: "$name" },
        description: { $first: "$description" },
        creditHours: { $first: "$creditHours" },
        departments: { $first: "$departments" },
        prerequisites: { $push: "$prerequisite" },
      },
    },
    {
      $project: {
        _id: 0,
        code: 1,
        name: 1,
        description: 1,
        creditHours: 1,
        departments: {
          code: 1,
          name: 1,
          capacity: 1,
          program: 1,
        },
        prerequisites: 1,
      },
    },
    {
      $sort: {
        code: 1,
      },
    },
  ]);

  const totalCourses = await CourseModel.countDocuments({});

  return res.status(200).json({
    courses,
    total: totalCourses,
  });
};

export default fetchPaginatedCoursesHandler;
