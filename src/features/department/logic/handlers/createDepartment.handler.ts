import mongoose from "mongoose";
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

const handler = async (req: HandlerRequest, res: Response) => {
  const { code, name } = req.body;

  const department = new DepartmentModel({
    code,
    name,
  });

  await department.save();

  const response = {
    message: "Department created successfully",
    department: {
      code: department.code,
      name: department.name,
    },
  };

  return res.status(201).json(response);
};

const createDepartmentHandler = handler;
export default createDepartmentHandler;
