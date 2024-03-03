import { Request, Response } from "express";

import { DepartmentModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request<{
  departmentId: string;
}>;

/**
 * Delete a department by its ID.
 */

const handler = async (req: HandlerRequest, res: Response) => {
  const departmentId = req.params.departmentId;

  const department = await DepartmentModel.findByIdAndDelete(departmentId);
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

const deleteDepartmentHandler = handler;
export default deleteDepartmentHandler;
