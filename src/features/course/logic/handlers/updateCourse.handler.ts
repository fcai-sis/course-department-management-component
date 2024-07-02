import { Request, Response } from "express";
import {
  CourseDepartmentModel,
  CourseModel,
  CoursePrerequisiteModel,
  CourseType,
  DepartmentModel,
} from "@fcai-sis/shared-models";
import { CourseCode, DepartmentCode } from "../../data/types";

type HandlerRequest = Request<
  {
    courseCode: CourseCode;
  },
  {},
  {
    course: Partial<
      CourseType & {
        departments: DepartmentCode[];
        prerequisites: CourseCode[];
      }
    >;
    departments: DepartmentCode[];
  }
>;

/**
 * Update a course.
 */
const updateCourseHandler = async (req: HandlerRequest, res: Response) => {
  const { course } = req.body;

  const updatedCourse = await CourseModel.findOne({
    code: req.params.courseCode,
  });

  if (!updatedCourse) {
    return res.status(404).json({
      errors: [
        {
          message: "Course not found",
        },
      ],
    });
  }

  let newDepartments: any[] | undefined = undefined;
  if (course.departments) {
    await CourseDepartmentModel.deleteMany({
      course: updatedCourse._id,
    });

    const fetchedDepartments = await DepartmentModel.find({
      code: { $in: course.departments },
    });

    const nonExistentDepartments = course.departments.filter(
      (department) =>
        !fetchedDepartments.find(
          (fetchedDepartment) => fetchedDepartment.code === department
        )
    );

    if (nonExistentDepartments.length) {
      return res.status(400).json({
        errors: [
          {
            message: "Some departments do not exist",
            departments: nonExistentDepartments,
          },
        ],
      });
    }

    const courseDepartments = fetchedDepartments.map((department) => ({
      course: updatedCourse._id,
      department: department._id,
    }));

    await CourseDepartmentModel.insertMany(courseDepartments);
    newDepartments = fetchedDepartments.map((department) => ({
      ...department.toJSON(),
      _id: undefined,
      __v: undefined,
    }));
  }

  let newPrerequisites: any[] | undefined = undefined;
  if (course.prerequisites) {
    await CoursePrerequisiteModel.deleteMany({
      course: updatedCourse._id,
    });

    const fetchedPrerequisites = await CourseModel.find({
      code: { $in: course.prerequisites },
    });

    const nonExistentPrerequisites = course.prerequisites.filter(
      (prerequisite) =>
        !fetchedPrerequisites.find(
          (fetchedPrerequisite) => fetchedPrerequisite.code === prerequisite
        )
    );

    if (nonExistentPrerequisites.length) {
      return res.status(400).json({
        errors: [
          {
            message: "Some prerequisites do not exist",
            prerequisites: nonExistentPrerequisites,
          },
        ],
      });
    }

    const coursePrerequisites = fetchedPrerequisites.map((prerequisite) => ({
      course: updatedCourse._id,
      prerequisite: prerequisite._id,
    }));

    await CoursePrerequisiteModel.insertMany(coursePrerequisites);
    newPrerequisites = fetchedPrerequisites.map((prerequisite) => ({
      ...prerequisite.toJSON(),
      _id: undefined,
      __v: undefined,
    }));
  }

  if (course.courseType) {
    updatedCourse.courseType = course.courseType;
  }

  if (course.creditHours) {
    updatedCourse.creditHours = course.creditHours;
  }

  if (course.description) {
    updatedCourse.description = {
      ...updatedCourse.description,
      ...course.description,
    };
  }

  if (course.name) {
    updatedCourse.name = {
      ...updatedCourse.name,
      ...course.name,
    };
  }

  const savedCourse = await updatedCourse.save();

  return res.status(200).json({
    message: "Course updated successfully",
    course: {
      ...savedCourse.toJSON(),

      departments: newDepartments,
      prerequisites: newPrerequisites,

      _id: undefined,
      __v: undefined,
    },
  });
};

export default updateCourseHandler;
