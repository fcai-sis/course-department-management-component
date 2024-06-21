import { Request, Response } from "express";
import {
  CourseDepartmentModel,
  CourseModel,
  CoursePrerequisiteModel,
  CourseType,
  DepartmentModel,
} from "@fcai-sis/shared-models";
import { CourseCode, DepartmentCode } from "features/course/data/types";

type HandlerRequest = Request<
  {},
  {},
  {
    course: CourseType & {
      departments: DepartmentCode[];
      prerequisites: CourseCode[];
    };
  }
>;

/**
 * Creates a course.
 */
const createCourseHandler = async (req: HandlerRequest, res: Response) => {
  const {
    course: { departments, prerequisites },
    course,
  } = req.body;

  const fetchedDepartments = await DepartmentModel.find({
    code: { $in: departments },
  });

  const nonExistentDepartments = departments.filter(
    (department) =>
      !fetchedDepartments.find(
        (fetchedDepartment) => fetchedDepartment.code === department
      )
  );

  if (nonExistentDepartments.length) {
    return res.status(400).json({
      message: "Some departments do not exist",
      departments: nonExistentDepartments,
    });
  }

  const fetchedPrerequisites = await CourseModel.find({
    code: { $in: prerequisites },
  });

  const nonExistentPrerequisites = prerequisites.filter(
    (prerequisite) =>
      !fetchedPrerequisites.find(
        (fetchedPrerequisite) => fetchedPrerequisite.code === prerequisite
      )
  );

  if (nonExistentPrerequisites.length) {
    return res.status(400).json({
      message: "Some prerequisites do not exist",
      prerequisites: nonExistentPrerequisites,
    });
  }

  const existingCourse = await CourseModel.findOne({ code: course.code });
  if (existingCourse) {
    return res.status(400).json({
      message: "Course with the same code already exists",
    });
  }

  const createdCourse = await CourseModel.create<CourseType>({
    code: course.code,
    courseType: course.courseType,
    creditHours: course.creditHours,
    description: course.description,
    name: course.name,
  });

  await CourseDepartmentModel.insertMany(
    fetchedDepartments.map((fetchedDepartment) => ({
      department: fetchedDepartment._id,
      course: createdCourse._id,
    }))
  );

  await CoursePrerequisiteModel.insertMany(
    fetchedPrerequisites.map((fetchedPrerequisite) => ({
      prerequisite: fetchedPrerequisite._id,
      course: createdCourse._id,
    }))
  );

  return res.status(201).json({
    message: "Course created successfully",
    course: {
      ...createdCourse.toJSON(),

      departments: fetchedDepartments.map((fetchedDepartment) => ({
        ...fetchedDepartment.toJSON(),
        _id: undefined,
        __v: undefined,
      })),
      prerequisites: fetchedPrerequisites.map((fetchedPrerequisite) => ({
        ...fetchedPrerequisite.toJSON(),
        _id: undefined,
        __v: undefined,
      })),

      _id: undefined,
      __v: undefined,
    },
  });
};

export default createCourseHandler;
