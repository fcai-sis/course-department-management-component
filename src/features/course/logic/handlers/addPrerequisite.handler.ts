import { Request, Response } from "express";

import { CourseModel } from "@fcai-sis/shared-models";
import mongoose, { Schema, SchemaType } from "mongoose";

type HandlerRequest = Request<
  {
    courseId: string;
  },
  {},
  {
    prerequisites: string[]; // TODO: figure out the type of the prerequisites
  }
>;

/**
 * Add a prerequisite(s) for a course (if it doesn't already exist).
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

  // check that the provided prerequisites aren't already in the course's prerequisites
  const existingPrerequisites = course.prerequisites;
  if (
    existingPrerequisites.some((prerequisite: Schema.Types.ObjectId) =>
      prerequisites.includes(prerequisite.toString())
    )
  ) {
    return res.status(409).json({
      error: {
        message: "Conflict: Prerequisite(s) already exist",
      },
    });
  }

  course.prerequisites.push(
    ...prerequisites.map(
      (prerequisite: string) => new mongoose.Types.ObjectId(prerequisite)
    )
  );
  await course.save();

  const response = {
    message: "Prerequisite(s) added successfully",
    course: {
      code: course.code,
      name: course.name,
      description: course.description,
      department: course.departments,
      creditHours: course.creditHours,
      prerequisites: course.prerequisites,
    },
  };

  return res.status(201).json(response);
};

const createPrerequisiteHandler = handler;
export default createPrerequisiteHandler;
