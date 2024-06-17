import { Request, Response } from "express";

import { DepartmentModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request<{
  departmentCode: string;
}>;

/**
 * Delete a department by its code.
 */
const deleteDepartmentHandler = async (req: HandlerRequest, res: Response) => {
  const departmentCode = req.params.departmentCode;

  const department = await DepartmentModel.findOneAndDelete({
    code: departmentCode,
  });
  if (!department) {
    return res.status(404).json({
      error: {
        message: "Department not found",
      },
    });
  }
  const response = {
    message: "Department deleted successfully",
    department: {
      code: department.code,
      name: department.name,
    },
  };
  return res.status(200).json(response);
};

export default deleteDepartmentHandler;
