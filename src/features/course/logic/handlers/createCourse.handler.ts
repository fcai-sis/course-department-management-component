import mongoose from "mongoose";
import { Request, Response } from "express";
import { CourseModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request<
  {},
  {},
  {
    code: string;
    name: {
      ar: string;
      en: string;
    };
    description: {
      ar: string;
      en: string;
    };
    department: mongoose.Types.ObjectId;
    creditHours: number;
  }
>;

/*
 * Creates a course.
 * */
const handler = async (req: HandlerRequest, res: Response) => {
  const { code, name, description, department, creditHours } = req.body;

  const course = new CourseModel({
    code,
    name,
    description,
    department: department,
    creditHours,
  });

  await course.save();

  const response = {
    message: "Course created successfully",
    course: {
      code: course.code,
      name: course.name,
      description: course.description,
      department: course.department,
      creditHours: course.creditHours,
    },
  };

  return res.status(201).json(response);
};

const createCourseHandler = handler;
export default createCourseHandler;
