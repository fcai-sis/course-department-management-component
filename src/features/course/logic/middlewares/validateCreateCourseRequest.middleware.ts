import * as validator from "express-validator";
import { CourseTypeEnum } from "@fcai-sis/shared-models";
import { validateRequestMiddleware } from "@fcai-sis/shared-middlewares";

/**
 * Validates the request body of the Create course endpoint.
 */
const validateCreateCourseRequestMiddleware = [
  validator
    .body("course.code")

    .exists()
    .withMessage("Course code is required")

    .isString()
    .withMessage("Course code must be a string"),

  validator
    .body("course.name")

    .exists()
    .withMessage("Course name is required")

    .isObject()
    .withMessage("Course name must be an object"),

  validator
    .body("course.name.en")

    .exists()
    .withMessage("Course name in English is required")

    .isString()
    .withMessage("Course name in English must be a string"),

  validator
    .body("course.name.ar")

    .exists()
    .withMessage("Course name in Arabic is required")

    .isString()
    .withMessage("Course name in Arabic must be a string"),

  validator
    .body("course.description")

    .exists()
    .withMessage("Course description is required")

    .isObject()
    .withMessage("Course description must be an object"),

  validator
    .body("course.description.en")

    .exists()
    .withMessage("Course description in English is required")

    .isString()
    .withMessage("Course description in English must be a string"),

  validator
    .body("course.description.ar")

    .exists()
    .withMessage("Course description in Arabic is required")

    .isString()
    .withMessage("Course description in Arabic must be a string"),

  validator
    .body("course.creditHours")

    .exists()
    .withMessage("Course credit hours is required")

    .isInt()
    .withMessage("Course credit hours must be and integer"),

  validator
    .body("course.courseType")

    .exists()
    .withMessage("Course type is required")

    .isIn(CourseTypeEnum)
    .withMessage("Course type is invalid"),

  validator
    .body("course.departments")

    .exists()
    .withMessage("Course departments are required")

    .isArray()
    .withMessage("Course departments must be an array"),

  validator
    .body("course.departments.*")

    .isString()
    .withMessage("Course department must be a string"),

  validator
    .body("course.prerequisites")

    .exists()
    .withMessage("Course prerequisites are required")

    .isArray()
    .withMessage("Course prerequisites must be an array"),

  validator
    .body("course.prerequisites.*")

    .isString()
    .withMessage("Course prerequisite must be a string"),

  validateRequestMiddleware,
];

export default validateCreateCourseRequestMiddleware;
