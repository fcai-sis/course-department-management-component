import { Request, Response } from "express";
import { DepartmentModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request<
  {},
  {},
  {
    code: string;
    name: {
      ar: string;
      en: string;
    };
  }
>;

/**
 * Create a department.
 */
const createDepartmentHandler = async (req: HandlerRequest, res: Response) => {
  const { code, name } = req.body;

  const department = new DepartmentModel({
    code,
    name,
  });

  await department.save();

  return res.status(201).json({
    message: "Department created successfully",
    department: {
      code: department.code,
      name: department.name,
    },
  });
};

export default createDepartmentHandler;
