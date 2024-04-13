import { Request, Response } from "express";
import { CourseModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request<
  {
    courseCode: string;
  },
  {},
  {}
>;

/**
 * Find a course by its code.
 */

const handler = async (req: HandlerRequest, res: Response) => {
  const courseCode = req.params.courseCode;

  const course = await CourseModel.findOne({ code: courseCode });

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
      department: course.departments,
      creditHours: course.creditHours,
      prerequisites: course.prerequisites,
      courseType: course.courseType,
    },
  };

  return res.status(200).json(response);
};

const getCourseByCodeHandler = handler;
export default getCourseByCodeHandler;
