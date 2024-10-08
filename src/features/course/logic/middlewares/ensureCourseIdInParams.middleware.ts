import { Request, Response, NextFunction } from "express";
import * as validator from "express-validator";

const middlewares = [
  validator
    .param("courseId")

    .exists()
    .withMessage("Course ID is required")

    .isMongoId()
    .withMessage("Course ID must be a valid Mongo ID"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          message: errors.array()[0].msg,
        },
      });
    }

    req.params.courseId = req.params.courseId.trim();

    next();
  },
];

const ensureCourseIdInParamsMiddleware = middlewares;
export default ensureCourseIdInParamsMiddleware;
