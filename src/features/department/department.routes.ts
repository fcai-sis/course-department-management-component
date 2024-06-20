import { asyncHandler } from "@fcai-sis/shared-utilities";
import { Router } from "express";
import createDepartmentHandler from "./logic/handlers/createDepartment.handler";
import validateCreateDepartmentRequestMiddleware from "./logic/middlewares/validateCreateDepartment.middleware";
import fetchPagiantedDepartmentsHandler from "./logic/handlers/fetchPaginatedDepartments.handler";
import validateUpdateDepartmentRequestMiddleware from "./logic/middlewares/validateUpdateDepartment.middleware";
import updateDepartmentHandler from "./logic/handlers/updateDepartment.handler";
import deleteDepartmentHandler from "./logic/handlers/deleteDepartment.handler";
import fetchDepartmentByCodeHandler from "./logic/handlers/fetchDepartmentByCode.handler";
import ensureDepartmentCodeInParamsMiddleware from "./logic/middlewares/ensureDepartmentCodeInParams.middleware";

const departmentRoutes = (router: Router) => {
  /*
   * Create a new department
   * */
  router.post(
    "/",
    validateCreateDepartmentRequestMiddleware,
    asyncHandler(createDepartmentHandler)
  );

  // Read all departments
  router.get("/", fetchPagiantedDepartmentsHandler);

  // Read a department by its code
  router.get(
    "/:departmentCode",
    ensureDepartmentCodeInParamsMiddleware,
    asyncHandler(fetchDepartmentByCodeHandler)
  );

  // Update a department by its code
  router.patch(
    "/:departmentCode",
    ensureDepartmentCodeInParamsMiddleware,
    validateUpdateDepartmentRequestMiddleware,
    asyncHandler(updateDepartmentHandler)
  );

  // Delete a department by its code
  router.delete(
    "/:departmentCode",
    ensureDepartmentCodeInParamsMiddleware,
    asyncHandler(deleteDepartmentHandler)
  );
};

export default departmentRoutes;
