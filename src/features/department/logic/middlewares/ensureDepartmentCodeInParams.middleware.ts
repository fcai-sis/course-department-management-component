import { validateRequestMiddleware } from "@fcai-sis/shared-middlewares";
import { Request, Response, NextFunction } from "express";
import * as validator from "express-validator";

const ensureDepartmentCodeInParamsMiddleware = [
  validator
    .param("departmentCode")

    .exists()
    .withMessage("Department Code is required"),

  validateRequestMiddleware,
];

export default ensureDepartmentCodeInParamsMiddleware;
