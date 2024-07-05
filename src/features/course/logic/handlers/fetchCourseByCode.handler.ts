import { Request, Response } from "express";
import {
  CourseDepartmentModel,
  CourseModel,
  CoursePrerequisiteModel,
  DepartmentModel,
} from "@fcai-sis/shared-models";
import { CourseCode } from "../../data/types";

type HandlerRequest = Request<{ courseCode: CourseCode }>;

/**
 * Find a course by its code.
 */
const fetchCourseByCodeHandler = async (req: HandlerRequest, res: Response) => {
  const course = await CourseModel.aggregate([
    {
      $match: {
        code: req.params.courseCode,
      },
    },
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
  ]);

  if (!course.length) {
    return res.status(404).json({
      errors: [
        {
          message: "Course not found",
        },
      ],
    });
  }

  return res.status(200).json({
    course: course[0],
  });
};

export default fetchCourseByCodeHandler;
