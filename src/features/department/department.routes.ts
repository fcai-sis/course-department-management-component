import { asyncHandler } from "@fcai-sis/shared-utilities";
import { Router } from "express";
import createDepartmentHandler from "./logic/handlers/createDepartment.handler";
import validateCreateDepartmentMiddleware from "./logic/middlewares/validateCreateDepartmentMiddleware.middleware";

const departmentRoutes = (router: Router) => {
  /*
   * Create a new department
   * */
  router.post(
    "/create",

    validateCreateDepartmentMiddleware,

    asyncHandler(createDepartmentHandler)
  );
};

export default departmentRoutes;
