import { asyncHandler } from "@fcai-sis/shared-utilities";
import { Router } from "express";
import createCourseHandler from "./logic/handlers/createCourse.handler";
import validateCreateCourseRequestMiddleware from "./logic/middlewares/validateCreateCourseRequest.middleware";

const courseRoutes = (router: Router) => {
  /*
   * Create a new course
   * */
  router.post(
    "/create",

    validateCreateCourseRequestMiddleware,

    asyncHandler(createCourseHandler)
  );

  // /*
  //  * Get all courses
  //  * */
  // router.get(
  //   "/read",

  //   asyncHandler(readCoursesHandler)
  // );

  // /*
  //  * Get a course by code
  //  * */
  // router.get(
  //   "/read/:code",

  //   ensureCourseCodeInParamsMiddleware,

  //   asyncHandler(readCourseByIdHandler)
  // );

  // /*
  //  * Update a course by code
  //  * */
  // router.patch(
  //   "/update/:code",

  //   ensureCourseCodeInParamsMiddleware,
  //   validateUpdateCourseRequestMiddleware,

  //   asyncHandler(updateCourseHandler)
  // );

  // /*
  //  * Delete a course by code
  //  * */
  // router.delete(
  //   "/delete/:code",

  //   ensureCourseCodeInParamsMiddleware,

  //   asyncHandler(deleteCourseHandler)
  // );
};

export default courseRoutes;
