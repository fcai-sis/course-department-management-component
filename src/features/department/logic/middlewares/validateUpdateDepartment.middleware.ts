import { Request, Response, NextFunction } from "express";
import * as validator from "express-validator";

import logger from "../../../../core/logger";
import { DepartmentModel } from "@fcai-sis/shared-models";

const middlewares = [
  validator
    .body("code")
    .optional()
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
    .optional()
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
      `Validating update department req body: ${JSON.stringify(req.body)}`
    );

    // If any of the validations above failed, return an error response
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      logger.debug(
        `Validation failed for update department req body: ${JSON.stringify(
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

    next();
  },
];

const validateUpdateDepartmentMiddleware = middlewares;
export default validateUpdateDepartmentMiddleware;
