import { Request, Response } from "express";

import CourseModel from "../../data/models/course.model";

type HandlerRequest = Request;

/**
 * Get all courses.
 */

const handler = async (req: HandlerRequest, res: Response) => {
  const page = req.context.page;
  const pageSize = req.context.pageSize;

  const courses = await CourseModel.find()
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  const response = {
    courses: courses.map((course) => ({
      code: course.code,
      name: course.name,
      description: course.description,
      department: course.department,
      creditHours: course.creditHours,
    })),
  };

  return res.status(200).json(response);
};

const readCoursesHandler = handler;

export default readCoursesHandler;
