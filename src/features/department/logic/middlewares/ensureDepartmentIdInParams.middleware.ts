import { Request, Response, NextFunction } from "express";
import * as validator from "express-validator";

const middlewares = [
  validator
    .param("departmentId")

    .exists()
    .withMessage("Department ID is required")

    .isMongoId()
    .withMessage("Department ID must be a valid Mongo ID"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          message: errors.array()[0].msg,
        },
      });
    }

    req.params.departmentId = req.params.departmentId.trim();

    next();
  },
];

const ensureDepartmentIdInParamsMiddleware = middlewares;
export default ensureDepartmentIdInParamsMiddleware;
