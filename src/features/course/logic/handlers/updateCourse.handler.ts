import { Request, Response } from "express";
import { CourseModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request<
  {
    courseId: string;
  },
  {},
  {
    code?: string;
    name?: {
      ar: string;
      en: string;
    };
    description?: {
      ar: string;
      en: string;
    };
    department?: string;
    creditHours?: number;
  }
>;

/**
 * Update a course.
 */

const handler = async (req: HandlerRequest, res: Response) => {
  const courseId = req.params.courseId;

  const course = await CourseModel.findByIdAndUpdate(
    courseId,
    {
      ...req.body,
    },
    { new: true }
  );

  if (!course) {
    return res.status(404).json({
      error: {
        message: "Course not found",
      },
    });
  }

  const response = {
    message: "Course updated successfully",
    course: {
      code: course.code,
      name: course.name,
      description: course.description,
      department: course.department,
      creditHours: course.creditHours,
      prerequisites: course.prerequisites,
    },
  };

  return res.status(200).json(response);
};

const updateCourseHandler = handler;

export default updateCourseHandler;
