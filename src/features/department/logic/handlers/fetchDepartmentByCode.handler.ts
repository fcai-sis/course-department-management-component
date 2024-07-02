import { Request, Response } from "express";
import { DepartmentModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request<{
  departmentCode: string;
}>;

/**
 * Find a department by its code.
 */

const getDepartmentByCodeHandler = async (
  req: HandlerRequest,
  res: Response
) => {
  const department = await DepartmentModel.findOne({
    code: req.params.departmentCode,
  });

  if (!department) {
    return res.status(404).json({
      errors: [
        {
          message: "Department not found",
        },
      ],
    });
  }

  return res.status(200).json({
    department: {
      ...department.toJSON(),
      _id: undefined,
      __v: undefined,
    },
  });
};

export default getDepartmentByCodeHandler;
