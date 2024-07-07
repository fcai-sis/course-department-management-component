import { Request, Response } from "express";

import {
  departmentLocalizedFields,
  DepartmentModel,
} from "@fcai-sis/shared-models";

type HandlerRequest = Request;

/**
 * Reads all departments.
 */
const readDepartmentsHandler = async (req: HandlerRequest, res: Response) => {
  const departments = await DepartmentModel.find({})
    .skip(req.skip ?? 0)
    .limit(req.query.limit as unknown as number);
  const total = await DepartmentModel.countDocuments({});

  return res.status(200).json({
    departments: departments.map((department) => ({
      ...department.toJSON(),
      __v: undefined,
    })),
    departmentLocalizedFields,
    total,
  });
};
export default readDepartmentsHandler;
