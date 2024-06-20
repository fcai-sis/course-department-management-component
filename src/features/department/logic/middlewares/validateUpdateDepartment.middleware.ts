import * as validator from "express-validator";
import { validateRequestMiddleware } from "@fcai-sis/shared-middlewares";
import { ProgramEnum } from "@fcai-sis/shared-models";

/**
 * Validates the request body of the update Department endpoint.
 */
const validateUpdateDepartmentRequestMiddleware = [
  validator
    .body("department")

    .exists()
    .withMessage("Department is required")

    .isObject()
    .withMessage("Department must be an object"),

  validator
    .body("department.name")

    .optional()

    .isObject()
    .withMessage("Department name must be an object"),

  validator
    .body("department.name.en")

    .optional()

    .isString()
    .withMessage("Department name in English must be a string"),

  validator
    .body("department.name.ar")

    .optional()

    .isString()
    .withMessage("Department name in Arabic must be a string"),

  validator
    .body("department.capacity")

    .optional()

    .isInt()
    .withMessage("Department capacity must be a number"),

  validator
    .body("department.program")

    .optional()

    .isString()
    .withMessage("Department program must be a string")

    .isIn(ProgramEnum)
    .withMessage(`Department program must be one of ${ProgramEnum.join(", ")}`),

  validateRequestMiddleware,
];

export default validateUpdateDepartmentRequestMiddleware;
