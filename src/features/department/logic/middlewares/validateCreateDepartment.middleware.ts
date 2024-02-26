import * as validator from "express-validator";
import { NextFunction, Request, Response } from "express";

import logger from "../../../../core/logger";
import DepartmentModel from "../../data/models/department.model";

/**
 * Validates the request body of the Create Department endpoint.
 */

const middlewares = [
  validator
    .body("code")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Department code is required")
    .isString()
    .withMessage("Department code must be a string")
    .custom((value) => {
      // Department code must follow this pattern: at least 2 uppercase letters and optionally followed by numbers
      const pattern = /^[A-Z]{2,}\d*$/; // Example : AC1 or AD05
      if (!pattern.test(value)) {
        throw new Error("Invalid department code format");
      }

      return true;
    })
    .custom(async (value) => {
      // Check if it already exists in the database
      const existingDepartment = await DepartmentModel.findOne({ code: value });
      if (existingDepartment !== null) {
        throw new Error("Department code already exists");
      }

      return true;
    }),

  validator
    .body("name")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Department name is required")
    .isObject()
    .withMessage("Department name must be an object")
    .custom((value) => {
      if (!value.en || !value.ar) {
        throw new Error(
          "Department name must contain English and Arabic properties"
        );
      }
      if (typeof value.en !== "string" || typeof value.ar !== "string") {
        throw new Error("Department name properties must be strings");
      }
      return true;
    }),

  (req: Request, res: Response, next: NextFunction) => {
    logger.debug(
      `Validating create department req body: ${JSON.stringify(req.body)}`
    );

    // If any of the validations above failed, return an error response
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      logger.debug(
        `Validation failed for create department req body: ${JSON.stringify(
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
    req.body.code = req.body.code.trim();
    req.body.name = req.body.name;

    next();
  },
];

const validateCreateDepartmentMiddleware = middlewares;
export default validateCreateDepartmentMiddleware;
