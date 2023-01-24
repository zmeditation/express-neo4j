import { NextFunction, Request, Response } from "express";
import { ResourceNotFound } from "../errors";
import { logger } from "../logger";

export function handleError(
  error: Error,
  _: Request,
  res: Response,
  __: NextFunction
) {
  logger.error(error.name);
  if (error instanceof ResourceNotFound) {
    res.status(error.code).send(error);
  } else res.status(500).send(error);
}
