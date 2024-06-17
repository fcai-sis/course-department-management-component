import { asyncHandler } from "@fcai-sis/shared-utilities";
import { Router } from "express";
import createDepartmentHandler from "./logic/handlers/createDepartment.handler";
import validateCreateDepartmentMiddleware from "./logic/middlewares/validateCreateDepartment.middleware";
import readDepartmentsHandler from "./logic/handlers/readDepartments.handler";
import { paginationQueryParamsMiddleware } from "@fcai-sis/shared-middlewares";
import ensureDepartmentIdInParamsMiddleware from "./logic/middlewares/ensureDepartmentIdInParams.middleware";
import getDepartmentByIdHandler from "./logic/handlers/getDepartmentById.handler";
import validateUpdateDepartmentMiddleware from "./logic/middlewares/validateUpdateDepartment.middleware";
import updateDepartmentHandler from "./logic/handlers/updateDepartment.handler";
import deleteDepartmentHandler from "./logic/handlers/deleteDepartment.handler";
import getDepartmentByCodeHandler from "./logic/handlers/getDepartmentByCode.handler";
import ensureDepartmentCodeInParamsMiddleware from "./logic/middlewares/ensureDepartmentCodeInParams.middleware";

const departmentRoutes = (router: Router) => {
  /*
   * Create a new department
   * */
  router.post(
    "/",

    validateCreateDepartmentMiddleware,

    asyncHandler(createDepartmentHandler)
  );

  /**
   * Read all departments
   *
   */
  router.get(
    "/",

    // Validate request query params for pagination
    paginationQueryParamsMiddleware,

    asyncHandler(readDepartmentsHandler)
  );

  /**
   * Read a department by its ID
   */
  // router.get(
  //   "/:departmentId",

  //   // Ensure the department ID is in the request params
  //   ensureDepartmentIdInParamsMiddleware,

  //   asyncHandler(getDepartmentByIdHandler)
  // );

  /**
   * Read a department by its code
   */
  router.get(
    "/:departmentCode",

    // Ensure the department code is in the request params
    ensureDepartmentCodeInParamsMiddleware,

    asyncHandler(getDepartmentByCodeHandler)
  );

  /**
   * Update a department by its ID
   */
  router.patch(
    "/:departmentCode",

    // Ensure the department ID is in the request params
    ensureDepartmentCodeInParamsMiddleware,

    // Validate the request body
    validateUpdateDepartmentMiddleware,

    asyncHandler(updateDepartmentHandler)
  );

  /**
   * Delete a department by its ID
   */
  router.delete(
    "/:departmentCode",

    // Ensure the department ID is in the request params
    ensureDepartmentCodeInParamsMiddleware,

    asyncHandler(deleteDepartmentHandler)
  );
};

export default departmentRoutes;
