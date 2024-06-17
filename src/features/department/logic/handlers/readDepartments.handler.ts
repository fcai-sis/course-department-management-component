import { Request, Response } from "express";

import { DepartmentModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request;

/**
 * Reads all departments.
 */

const readDepartmentsHandler = async (req: HandlerRequest, res: Response) => {
  // get the pagination parameters
  const page = req.context.page;
  const pageSize = req.context.pageSize;

  const departments = await DepartmentModel.find()
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  return res.status(200).json({
    departments: departments.map((department) => ({
      code: department.code,
      name: department.name,
    })),
  });
};

export default readDepartmentsHandler;
