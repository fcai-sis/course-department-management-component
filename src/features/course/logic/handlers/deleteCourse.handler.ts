import { Request, Response } from "express";
import { CourseModel } from "@fcai-sis/shared-models";
import { CourseCode } from "features/course/data/types";

type HandlerRequest = Request<{
  courseCode: CourseCode;
}>;

/**
 * Delete a course.
 */
const deleteCourseHandler = async (req: HandlerRequest, res: Response) => {
  const deletedCourse = await CourseModel.findOneAndDelete({
    code: req.params.courseCode,
  });

  if (!deletedCourse) {
    return res.status(404).json({
      error: {
        message: "Course not found",
      },
    });
  }

  return res.status(204).json({
    message: "Course deleted successfully",
    course: {
      ...deletedCourse.toJSON(),
      _id: undefined,
      __v: undefined,
    },
  });
};

export default deleteCourseHandler;
