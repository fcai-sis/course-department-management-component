import * as validator from "express-validator";
import { validateRequestMiddleware } from "@fcai-sis/shared-middlewares";
import { ProgramEnum } from "@fcai-sis/shared-models";

/**
 * Validates the request body of the Create Department endpoint.
 */
const validateCreateDepartmentRequestMiddleware = [
  validator
    .body("department.code")

    .exists()
    .withMessage("Department code is required")

    .isString()
    .withMessage("Department code must be a string"),

  validator
    .body("department.name")

    .exists()
    .withMessage("Department name is required")

    .isObject()
    .withMessage("Department name must be an object"),

  validator
    .body("department.name.en")

    .exists()
    .withMessage("Department name in English is required")

    .isString()
    .withMessage("Department name in English must be a string"),

  validator
    .body("department.name.ar")

    .exists()
    .withMessage("Department name in Arabic is required")

    .isString()
    .withMessage("Department name in Arabic must be a string"),

  validator
    .body("department.capacity")

    .exists()
    .withMessage("Department capacity is required")

    .isInt()
    .withMessage("Department capacity must be a number"),

  validator
    .body("department.program")

    .exists()
    .withMessage("Department program is required")

    .isString()
    .withMessage("Department program must be a string")

    .isIn(ProgramEnum)
    .withMessage(`Department program must be one of ${ProgramEnum.join(", ")}`),

  validateRequestMiddleware,
];

export default validateCreateDepartmentRequestMiddleware;
