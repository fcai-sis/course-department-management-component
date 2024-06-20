import { validateRequestMiddleware } from "@fcai-sis/shared-middlewares";
import * as validator from "express-validator";

const ensureCourseCodeInParamsMiddleware = [
  validator
    .param("courseCode")

    .exists()
    .withMessage("Course Code is required"),

  validateRequestMiddleware,
];

export default ensureCourseCodeInParamsMiddleware;
