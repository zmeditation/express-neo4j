import { NextFunction, Request, Response } from "express";
import { ResourceNotFound } from "../errors";
import { log } from "../log";

export function handleError(
  error: Error,
  _: Request,
  res: Response,
  __: NextFunction
) {
  log.error(error.name);
  if (error instanceof ResourceNotFound) {
    res.status(error.code).send(error);
  } else res.status(500).send(error);
}
