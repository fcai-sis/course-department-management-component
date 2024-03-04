import { Request, Response } from "express";

import CourseModel from "../../data/models/course.model";
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
 * Create a prerequisite(s) for a course
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

  // check that the provided prerequisites are valid courses
  const existingCourses = await CourseModel.find({
    _id: { $in: prerequisites.map((id) => new mongoose.Types.ObjectId(id)) },
  });

  if (existingCourses.length !== prerequisites.length) {
    return res.status(422).json({
      error: {
        message: "Invalid prerequisite(s)",
      },
    });
  }

  // check that the provided prerequisites aren't already in the course's prerequisites
  const existingPrerequisites = course.prerequisites;
  if (
    existingPrerequisites.some((prerequisite) =>
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
      (prerequisite) => new mongoose.Types.ObjectId(prerequisite)
    )
  );
  await course.save();

  const response = {
    message: "Prerequisite(s) added successfully",
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

const createPrerequisiteHandler = handler;
export default createPrerequisiteHandler;
