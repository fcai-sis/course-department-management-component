import { Request, Response, NextFunction } from "express";
import * as validator from "express-validator";

import logger from "../../../../core/logger";
import { CourseModel, CourseTypeEnum } from "@fcai-sis/shared-models";
import { DepartmentModel } from "@fcai-sis/shared-models";

const middlewares = [
  validator
    .body("code")
    .optional()
    .isString()
    .withMessage("Course code must be a string")
    .custom((value) => {
      // Course code must follow this pattern: 2-4 uppercase letters followed by 3 digits
      const pattern = /^[A-Z]{2,4}\d{3}$/;
      if (!pattern.test(value)) {
        throw new Error(
          "Invalid course code, must be 2-4 uppercase letters followed by 3 digits"
        );
      }

      return true;
    })
    .custom(async (value) => {
      // Check if it already exists in the database
      const existingCourse = await CourseModel.findOne({ code: value });
      if (existingCourse !== null) {
        throw new Error("Course code already exists");
      }

      return true;
    }),

  validator
    .body("name")
    .optional()
    .isObject()
    .withMessage("Course name must be an object")
    .custom((value) => {
      if (!value.en || !value.ar) {
        throw new Error(
          "Course name must contain English and Arabic properties"
        );
      }
      if (typeof value.en !== "string" || typeof value.ar !== "string") {
        throw new Error("Course name properties must be strings");
      }
      return true;
    }),

  validator
    .body("description")
    .optional()
    .isObject()
    .withMessage("Course description must be an object")
    .custom((value) => {
      if (!value.en || !value.ar) {
        throw new Error(
          "Course description must contain English and Arabic properties"
        );
      }
      if (typeof value.en !== "string" || typeof value.ar !== "string") {
        throw new Error("Course description properties must be strings");
      }
      return true;
    }),

  validator
    .body("departments")
    .optional()
    .isArray()
    .withMessage("Departments must be an array")
    .custom(async (value) => {
      // Check if all departments exist in the database
      const departments = await DepartmentModel.find({
        _id: { $in: value },
      });
      if (departments.length !== value.length) {
        throw new Error("Some departments do not exist");
      }

      return true;
    }),
  validator
    .body("creditHours")
    .optional()
    .isNumeric()
    .withMessage("Credit hours must be a number")
    .isInt({ min: 1, max: 4 })
    .withMessage("Course credit hours must be between 1 and 4"),

  validator
    .body("courseType")
    .optional()
    .isIn(CourseTypeEnum)
    .withMessage("Invalid course type"),

  (req: Request, res: Response, next: NextFunction) => {
    logger.debug(
      `Validating update course req body: ${JSON.stringify(req.body)}`
    );

    // If any of the validations above failed, return an error response
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      logger.debug(
        `Validation failed for update course req body: ${JSON.stringify(
          req.body
        )}`
      );

      return res.status(400).json({
        error: {
          message: errors.array()[0].msg,
        },
      });
    }

    // Attach the validated data to the request body, if it exists
    if (req.body.code) req.body.code = req.body.code.trim();
    if (req.body.name) req.body.name = req.body.name;
    if (req.body.description) req.body.description = req.body.description;
    if (req.body.departments) req.body.departments = req.body.departments;
    if (req.body.creditHours) req.body.creditHours = req.body.creditHours;

    next();
  },
];

const validateUpdateCourseRequestMiddleware = middlewares;
export default validateUpdateCourseRequestMiddleware;
