import { Request, Response } from "express";
import { DepartmentModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request<
  {
    departmentId: string;
  },
  {},
  {}
>;

/**
 * Find a department by its ID.
 */

const handler = async (req: HandlerRequest, res: Response) => {
  const departmentId = req.params.departmentId;

  const department = await DepartmentModel.findById(departmentId);

  if (!department) {
    return res.status(404).json({
      error: {
        message: "Department not found",
      },
    });
  }
  const response = {
    department: {
      code: department.code,
      name: department.name,
    },
  };

  return res.status(200).json(response);
};

const getDepartmentByIdHandler = handler;
export default getDepartmentByIdHandler;
