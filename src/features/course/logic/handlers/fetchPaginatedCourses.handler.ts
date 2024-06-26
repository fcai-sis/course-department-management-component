import { Request, Response } from "express";

import {
  CourseDepartmentModel,
  CourseModel,
  CoursePrerequisiteModel,
  DepartmentModel,
} from "@fcai-sis/shared-models";
import { asyncHandler } from "@fcai-sis/shared-utilities";
import paginate from "express-paginate";

type HandlerRequest = Request;

/**
 * Get all courses.
 */
const fetchPaginatedCoursesHandler = [
  paginate.middleware(),
  asyncHandler(async (req: HandlerRequest, res: Response) => {
    const totalCourses = await CourseModel.countDocuments(
      {},
      {
        skip: req.skip ?? 0,
        limit: req.query.limit as unknown as number,
      }
    );

    const courses = await CourseModel.aggregate([
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
          prerequisites: { $push: "$prerequisite.code" },
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
      {
        $skip: req.skip ?? 0,
      },
      {
        $limit: req.query.limit as unknown as number,
      },
    ]);

    return res.status(200).json({
      courses,
      totalCourses,
    });
  }),
];

export default fetchPaginatedCoursesHandler;
