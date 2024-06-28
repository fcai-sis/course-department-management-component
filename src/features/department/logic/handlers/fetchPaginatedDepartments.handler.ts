import { Request, Response } from "express";

import paginate from "express-paginate";
import { DepartmentModel, ProgramEnum } from "@fcai-sis/shared-models";
import { asyncHandler } from "@fcai-sis/shared-utilities";

type HandlerRequest = Request;

/**
 * Reads all departments.
 */
const readDepartmentsHandler = [
  paginate.middleware(),
  asyncHandler(async (req: HandlerRequest, res: Response) => {
    const departments = await DepartmentModel.find({
      program: { $in: [ProgramEnum[1], ProgramEnum[2]] },
    })
      .skip(req.skip ?? 0)
      .limit(req.query.limit as unknown as number);

    return res.status(200).json({
      departments: departments.map((department) => ({
        ...department.toJSON(),
        _id: undefined,
        __v: undefined,
      })),
    });
  }),
];

export default readDepartmentsHandler;
