import { Router } from "express";

import courseRoutes from "./features/course/course.routes";

const router: Router = Router();

export default (): Router => {
  courseRoutes(router);

  return router;
};
