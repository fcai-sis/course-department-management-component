import { Router } from "express";

import courseRoutes from "./features/course/course.routes";
import departmentRoutes from "./features/department/department.routes";

export const courseRouter = (): Router => {
  const router = Router();
  courseRoutes(router);
  return router;
};

export const departmentRouter = (): Router => {
  const router = Router();
  departmentRoutes(router);
  return router;
};
