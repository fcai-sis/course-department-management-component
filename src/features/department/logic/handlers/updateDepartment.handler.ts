import { Request, Response } from "express";

import { DepartmentModel, DepartmentType } from "@fcai-sis/shared-models";

type HandlerRequest = Request<
  {
    departmentCode: string;
  },
  {},
  {
    department: Partial<Omit<DepartmentType, "code">>;
  }
>;

/**
 * Update a department by its code.
 */
const updateDepartmentHandler = async (req: HandlerRequest, res: Response) => {
  const { department } = req.body;

  const updatedDepartment = await DepartmentModel.findOne({
    code: req.params.departmentCode,
  });

  if (!updatedDepartment) {
    return res.status(404).json({
      errors: [
        {
          message: "Department not found",
        },
      ],
    });
  }

  if (department.name) {
    updatedDepartment.name = {
      ...updatedDepartment.name,
      ...department.name,
    };
  }

  if (department.capacity) {
    updatedDepartment.capacity = department.capacity;
  }

  if (department.program) {
    updatedDepartment.program = department.program;
  }

  await updatedDepartment.save();

  res.status(200).json({
    message: "Department updated successfully",
    department: {
      ...updatedDepartment.toJSON(),
      _id: undefined,
      __v: undefined,
    },
  });
};

export default updateDepartmentHandler;
