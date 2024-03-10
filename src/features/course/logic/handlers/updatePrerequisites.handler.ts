import { Request, Response } from "express";

import { CourseModel } from "@fcai-sis/shared-models";
import mongoose from "mongoose";

type HandlerRequest = Request<
  {
    courseId: string;
  },
  {},
  {
    prerequisites: string[];
  }
>;

/**
 * Update and overwrite the prerequisites of a course.
 */

const handler = async (req: HandlerRequest, res: Response) => {
  const { courseId } = req.params;
  const { prerequisites } = req.body;

  const course = await CourseModel.findById(courseId);
  if (!course) {
    return res.status(404).json({
      error: {
        message: "Course not found",
      },
    });
  }

  // Update the course's prerequisites with the provided array of prerequisites
  course.prerequisites = prerequisites.map(
    (prerequisite) => new mongoose.Types.ObjectId(prerequisite)
  );

  await course.save();

  const response = {
    message: "Prerequisite(s) updated successfully",
    course: {
      code: course.code,
      name: course.name,
      description: course.description,
      department: course.department,
      creditHours: course.creditHours,
      prerequisites: course.prerequisites,
    },
  };

  return res.status(201).json(response);
};

const updatePrerequisitesHandler = handler;
export default updatePrerequisitesHandler;
