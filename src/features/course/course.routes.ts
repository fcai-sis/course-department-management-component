import { Router } from "express";
import { asyncHandler } from "@fcai-sis/shared-utilities";

import fetchPaginatedCoursesHandler from "./logic/handlers/fetchPaginatedCourses.handler";
import createCourseHandler from "./logic/handlers/createCourse.handler";
import updateCourseHandler from "./logic/handlers/updateCourse.handler";
import deleteCourseHandler from "./logic/handlers/deleteCourse.handler";
import fetchCourseByCodeHandler from "./logic/handlers/fetchCourseByCode.handler";
import createPrerequisiteHandler from "./logic/handlers/addPrerequisite.handler";
import updatePrerequisitesHandler from "./logic/handlers/updatePrerequisites.handler";
import ensureCourseCodeInParamsMiddleware from "./logic/middlewares/ensureCourseCodeInParams.middleware";
import validateCreateCourseRequestMiddleware from "./logic/middlewares/validateCreateCourseRequest.middleware";
import validateUpdateCourseRequestMiddleware from "./logic/middlewares/validateUpdateCourseRequest.middleware";
import validateCreatePrerequisiteRequestMiddleware from "./logic/middlewares/validateCreatePrerequisite.middleware";
import paginate from "express-paginate";
const courseRoutes = (router: Router) => {
  /*
   * Create a new course
   * */
  router.post(
    "/",
    validateCreateCourseRequestMiddleware,
    asyncHandler(createCourseHandler)
  );

  /*
   * Get all courses
   * */
  router.get(
    "/",
    paginate.middleware(),
    asyncHandler(fetchPaginatedCoursesHandler)
  );

  router.get("/all", asyncHandler(fetchPaginatedCoursesHandler));

  /*
   * Get a course by code
   * */
  router.get(
    "/:courseCode",
    ensureCourseCodeInParamsMiddleware,
    asyncHandler(fetchCourseByCodeHandler)
  );

  /*
   * Update a course by code
   * */
  router.patch(
    "/:courseCode",
    ensureCourseCodeInParamsMiddleware,
    validateUpdateCourseRequestMiddleware,
    asyncHandler(updateCourseHandler)
  );

  /*
   * Delete a course by code
   * */
  router.delete(
    "/:courseCode",
    ensureCourseCodeInParamsMiddleware,
    asyncHandler(deleteCourseHandler)
  );

  /**
   * Add a prerequisite(s) for a course (if it doesn't already exist).
   */
  router.post(
    "/prerequisite/:courseCode",
    ensureCourseCodeInParamsMiddleware,
    validateCreatePrerequisiteRequestMiddleware,
    asyncHandler(createPrerequisiteHandler)
  );

  /**
   * Update a course's prerequisites by overwriting them
   */
  router.patch(
    "/prerequisite/:courseCode",
    ensureCourseCodeInParamsMiddleware,
    validateCreatePrerequisiteRequestMiddleware,
    asyncHandler(updatePrerequisitesHandler)
  );
};

export default courseRoutes;
