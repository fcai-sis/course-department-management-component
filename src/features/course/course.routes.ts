import { asyncHandler } from "@fcai-sis/shared-utilities";
import { Router } from "express";

const courseRoutes = (router: Router) => {
  /*
   * Create a new course
   * */
  router.post(
    "/course",

    validateCreateCourseRequestMiddleware,

    asyncHandler(createCourseHandler),
  );

  /*
   * Get all courses
   * */
  router.get(
    "/course",

    asyncHandler(readCoursesHandler),
  );

  /*
   * Get a course by code
   * */
  router.get(
    "/course/:code",

    ensureCourseCodeInParamsMiddleware,

    asyncHandler(readCourseByIdHandler),
  );

  /*
   * Update a course by code
   * */
  router.patch(
    "/course/:code",

    ensureCourseCodeInParamsMiddleware,
    validateUpdateCourseRequestMiddleware,

    asyncHandler(updateCourseHandler),
  );

  /*
   * Delete a course by code
   * */
  router.delete(
    "/course/:code",

    ensureCourseCodeInParamsMiddleware,

    asyncHandler(deleteCourseHandler),
  );
};

export default courseRoutes;
