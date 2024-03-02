import { Request, Response } from "express";
import CourseModel from "../../data/models/course.model";

type HandlerRequest = Request<
  {
    courseId: string;
  },
  {},
  {}
>;

/**
 * Find a course by its ID.
 */

const handler = async (req: HandlerRequest, res: Response) => {
  const courseId = req.params.courseId;

  const course = await CourseModel.findById(courseId);

  if (!course) {
    return res.status(404).json({
      error: {
        message: "Course not found",
      },
    });
  }
  const response = {
    course: {
      code: course.code,
      name: course.name,
      description: course.description,
      department: course.department,
      creditHours: course.creditHours,
    },
  };

  return res.status(200).json(response);
};

const getCourseByIdHandler = handler;
export default getCourseByIdHandler;
