import { asyncHandler } from "@fcai-sis/shared-utilities";
import { Router } from "express";
import validateCreateCourseRequestMiddleware from "./logic/middlewares/validateCreateCourseRequest.middleware";
import readCoursesHandler from "./logic/handlers/readCourses.handler";
import { paginationQueryParamsMiddleware } from "@fcai-sis/shared-middlewares";
import ensureCourseCodeInParamsMiddleware from "./logic/middlewares/ensureCourseCodeInParams.middleware";
import getCourseByCodeHandler from "./logic/handlers/getCourseByCode.handler";
import validateUpdateCourseRequestMiddleware from "./logic/middlewares/validateUpdateCourseRequest.middleware";
import updateCourseHandler from "./logic/handlers/updateCourse.handler";
import ensureCourseIdInParamsMiddleware from "./logic/middlewares/ensureCourseIdInParams.middleware";
import deleteCourseHandler from "./logic/handlers/deleteCourse.handler";
import createPrerequisiteHandler from "./logic/handlers/createPrerequisite.handler";
import createCourseHandler from "./logic/handlers/createCourse.handler";

const courseRoutes = (router: Router) => {
  /*
   * Create a new course
   * */
  router.post(
    "/create",

    validateCreateCourseRequestMiddleware,

    asyncHandler(createCourseHandler)
  );

  /*
   * Get all courses
   * */
  router.get(
    "/read",

    // Validate request query params for pagination
    paginationQueryParamsMiddleware,

    asyncHandler(readCoursesHandler)
  );

  /*
   * Get a course by code
   * */
  router.get(
    "/read/:code",

    ensureCourseCodeInParamsMiddleware,

    asyncHandler(getCourseByCodeHandler)
  );

  /*
   * Update a course by ID
   * */
  router.patch(
    "/update/:courseId",

    ensureCourseIdInParamsMiddleware,
    validateUpdateCourseRequestMiddleware,

    asyncHandler(updateCourseHandler)
  );

  /*
   * Delete a course by ID
   * */
  router.delete(
    "/delete/:courseId",

    ensureCourseIdInParamsMiddleware,

    asyncHandler(deleteCourseHandler)
  );

  /**
   * Create a prerequisite(s) for a course
   */
  router.post(
    "/prerequisite/:courseId",
    ensureCourseIdInParamsMiddleware,
    asyncHandler(createPrerequisiteHandler)
  );
};

export default courseRoutes;
