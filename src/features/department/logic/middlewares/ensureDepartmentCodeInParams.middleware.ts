import { Request, Response, NextFunction } from "express";
import * as validator from "express-validator";

const middlewares = [
  validator
    .param("departmentCode")

    .exists()
    .withMessage("Department Code is required")

    .custom((value) => {
      // Department code must follow this pattern: at least 2 uppercase letters and optionally followed by numbers
      const pattern = /^[A-Z]{2,}\d*$/; // Example : AC1 or AD05
      if (!pattern.test(value)) {
        throw new Error("Invalid department code format");
      }

      return true;
    }),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          message: errors.array()[0].msg,
        },
      });
    }

    req.params.departmentCode = req.params.departmentCode.trim();

    next();
  },
];

const ensureDepartmentCodeInParamsMiddleware = middlewares;
export default ensureDepartmentCodeInParamsMiddleware;
