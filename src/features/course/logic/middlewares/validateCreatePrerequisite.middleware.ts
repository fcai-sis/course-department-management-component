import * as validator from "express-validator";
import { NextFunction, Request, Response } from "express";

import logger from "../../../../core/logger";
import { CourseModel } from "@fcai-sis/shared-models";
/**
 * Validates the request body of the Create Prerequisite endpoint.
 */

const middlewares = [
  validator
    .body("prerequisites")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Prerequisites are required")
    .isArray()
    .withMessage("Prerequisites must be an array")
    .custom(async (value) => {
      // Check if the provided prerequisites are valid courses
      const existingCourses = await CourseModel.find({
        _id: { $in: value },
      });

      if (existingCourses.length !== value.length) {
        throw new Error("Invalid prerequisite(s)");
      }

      return true;
    }),
  (req: Request, res: Response, next: NextFunction) => {
    logger.debug(
      `Validating add prerequisite req body: ${JSON.stringify(req.body)}`
    );

    // If any of the validations above failed, return an error response
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      logger.debug(
        `Validation failed for add prerequisite req body: ${JSON.stringify(
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
    req.context.prerequisites = req.body.prerequisites;

    next();
  },
];

const validateCreatePrerequisiteRequestMiddleware = middlewares;
export default validateCreatePrerequisiteRequestMiddleware;
