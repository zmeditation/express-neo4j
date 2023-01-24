import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export const routeHandler =
  (controller: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller(req, res);
      return res.status(StatusCodes.OK).send(result);
    } catch (error) {
      return next(error);
    }
  };
