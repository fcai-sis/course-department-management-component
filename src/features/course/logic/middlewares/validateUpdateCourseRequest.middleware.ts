import * as validator from "express-validator";
import { CourseTypeEnum } from "@fcai-sis/shared-models";
import { validateRequestMiddleware } from "@fcai-sis/shared-middlewares";

/**
 * Validates the request body of the Create course endpoint.
 */
const validateCreateCourseRequestMiddleware = [
  validator
    .body("course.code")

    .optional()

    .isString()
    .withMessage("Course code must be a string"),

  validator
    .body("course.name")

    .optional()

    .isObject()
    .withMessage("Course name must be an object"),

  validator
    .body("course.name.en")

    .optional()

    .isString()
    .withMessage("Course name in English must be a string"),

  validator
    .body("course.name.ar")

    .optional()

    .isString()
    .withMessage("Course name in Arabic must be a string"),

  validator
    .body("course.description")

    .optional()

    .isObject()
    .withMessage("Course description must be an object"),

  validator
    .body("course.description.en")

    .optional()

    .isString()
    .withMessage("Course description in English must be a string"),

  validator
    .body("course.description.ar")

    .optional()

    .isString()
    .withMessage("Course description in Arabic must be a string"),

  validator
    .body("course.creditHours")

    .optional()

    .isInt()
    .withMessage("Course credit hours must be and integer"),

  validator
    .body("course.courseType")

    .optional()

    .isIn(CourseTypeEnum)
    .withMessage("Course type is invalid"),

  validator
    .body("course.departments")

    .optional()

    .isArray()
    .withMessage("Course departments must be an array"),

  validator
    .body("course.departments.*")

    .optional()

    .isString()
    .withMessage("Course department must be a string"),

  validator
    .body("course.prerequisites")

    .optional()

    .isArray()
    .withMessage("Course prerequisites must be an array"),

  validator
    .body("course.prerequisites.*")

    .optional()

    .isString()
    .withMessage("Course prerequisite must be a string"),

  validateRequestMiddleware,
];

export default validateCreateCourseRequestMiddleware;
