import * as validator from "express-validator";
import { NextFunction, Request, Response } from "express";

import logger from "../../../../core/logger";
import { DepartmentModel, CourseModel } from "@fcai-sis/shared-models";

/**
 * Validates the request body of the Create course endpoint.
 */
const validateCreateCourseRequestMiddleware = [
  validator
    .body("code")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Course code is required")
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
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Course name is required")
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
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Course description is required")
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
    .body("department")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Course department is required")
    .isMongoId()
    .withMessage("Course department must be a valid department id")
    .custom(async (value) => {
      // Ensure department exists
      const existingDepartment = await DepartmentModel.findOne({ _id: value });
      if (existingDepartment === null) {
        throw new Error("Department does not exist");
      }
      return true;
    }),

  validator
    .body("creditHours")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Course credit hours is required")
    .isNumeric()
    .withMessage("Course credit hours must be a number")
    .isInt({ min: 1, max: 4 }) // TODO: Make sure this range is correct business-wise
    .withMessage("Course credit hours must be between 1 and 4"),

  (req: Request, res: Response, next: NextFunction) => {
    logger.debug(
      `Validating create course req body: ${JSON.stringify(req.body)}`
    );

    // If any of the validations above failed, return an error response
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      logger.debug(
        `Validation failed for create course req body: ${JSON.stringify(
          req.body
        )}`
      );

      return res.status(400).json({
        error: {
          message: errors.array()[0].msg,
        },
      });
    }

    // Attach the validated data to the request body
    req.context.code = req.body.code.trim();
    req.context.name = req.body.name;
    req.context.description = req.body.description;
    req.context.department = req.body.department;
    req.context.creditHours = req.body.creditHours;

    next();
  },
];

export default validateCreateCourseRequestMiddleware;
