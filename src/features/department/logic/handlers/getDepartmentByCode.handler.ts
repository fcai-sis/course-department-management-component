import { Request, Response } from "express";
import { DepartmentModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request<
  {
    departmentCode: string;
  },
  {},
  {}
>;

/**
 * Find a department by its code.
 */

const handler = async (req: HandlerRequest, res: Response) => {
  const departmentCode = req.params.departmentCode;

  const department = await DepartmentModel.findOne({ code: departmentCode });

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

const getDepartmentByCodeHandler = handler;
export default getDepartmentByCodeHandler;
