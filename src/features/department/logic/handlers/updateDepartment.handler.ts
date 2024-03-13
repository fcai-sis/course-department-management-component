import { Request, Response } from "express";

import { DepartmentModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request<
  {
    departmentId: string;
  },
  {},
  {
    code?: string;
    name?: {
      ar: string;
      en: string;
    };
  }
>;

/**
 * Update a department by its ID.
 */

const handler = async (req: HandlerRequest, res: Response) => {
  const departmentId = req.params.departmentId;

  const department = await DepartmentModel.findByIdAndUpdate(
    departmentId,
    {
      code: req.context.code,
      name: req.context.name,
    },
    {
      new: true,
    }
  );
  if (!department) {
    return res.status(404).json({
      error: {
        message: "Department not found",
      },
    });
  }
  const response = {
    message: "Department updated successfully",
    department: {
      code: department.code,
      name: department.name,
    },
  };
  return res.status(200).json(response);
};

const updateDepartmentHandler = handler;
export default updateDepartmentHandler;
