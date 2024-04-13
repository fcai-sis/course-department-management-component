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
    departments: mongoose.Types.ObjectId[];
    creditHours: number;
    courseType: string;
  }
>;

/*
 * Creates a course.
 * */
const createCourseHandler = async (req: HandlerRequest, res: Response) => {
  const { code, name, description, departments, creditHours, courseType } =
    req.body;

  const course = new CourseModel({
    code,
    name,
    description,
    departments,
    creditHours,
    courseType,
  });

  await course.save();

  const response = {
    message: "Course created successfully",
    course: {
      code: course.code,
      name: course.name,
      description: course.description,
      department: course.departments,
      creditHours: course.creditHours,
      courseType: course.courseType,
    },
  };

  return res.status(201).json(response);
};

export default createCourseHandler;
