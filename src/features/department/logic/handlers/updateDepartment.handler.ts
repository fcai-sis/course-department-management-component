import { Request, Response } from "express";

import { DepartmentModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request<
  {
    departmentCode: string;
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
 * Update a department by its code.
 */
const updateDepartmentHandler = async (req: HandlerRequest, res: Response) => {
  const departmentCode = req.params.departmentCode;

  const department = await DepartmentModel.findOneAndUpdate(
    { code: departmentCode },
    {
      code: req.body.code,
      name: req.body.name,
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

export default updateDepartmentHandler;
