import { Request, Response } from "express";
import { DepartmentModel, DepartmentType } from "@fcai-sis/shared-models";

type HandlerRequest = Request<
  {},
  {},
  {
    department: DepartmentType;
  }
>;

/**
 * Create a department.
 */
const createDepartmentHandler = async (req: HandlerRequest, res: Response) => {
  const { department } = req.body;

  const existingDepartment = await DepartmentModel.findOne({
    code: department.code,
  });

  if (existingDepartment) {
    return res.status(400).json({
      error: {
        message: "Department already exists",
      },
    });
  }

  const createdDepartment = await DepartmentModel.create<DepartmentType>({
    code: department.code,
    name: department.name,
    capacity: department.capacity,
    program: department.program,
  });

  return res.status(201).json({
    message: "Department created successfully",
    department: {
      ...createdDepartment.toJSON(),
      _id: undefined,
      __v: undefined,
    },
  });
};

export default createDepartmentHandler;
