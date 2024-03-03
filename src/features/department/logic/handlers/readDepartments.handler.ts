import { Request, Response } from "express";

import { DepartmentModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request;

/**
 * Reads all departments.
 */

const handler = async (req: HandlerRequest, res: Response) => {
  // get the pagination parameters
  const page = req.context.page;
  const pageSize = req.context.pageSize;

  const departments = await DepartmentModel.find()
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  const response = {
    departments: departments.map((department) => ({
      code: department.code,
      name: department.name,
    })),
  };

  return res.status(200).json(response);
};

const readDepartmentsHandler = handler;
export default readDepartmentsHandler;
