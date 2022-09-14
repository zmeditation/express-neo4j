import { Request, Response, NextFunction } from "express";

export const routeHandler =
  (controller: any) => (req: Request, res: Response, next: NextFunction) => {
    try {
      return controller(req, res);
    } catch (error) {
      return next(error);
    }
  };
