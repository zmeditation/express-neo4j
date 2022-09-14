import { NextFunction, Request, Response } from "express";
import { ResourceNotFound } from "../errors";

export function handleError(
  error: Error,
  _: Request,
  res: Response,
  __: NextFunction
) {
  console.error(error.name); // use logger
  if (error instanceof ResourceNotFound) {
    res.status(error.code).send(error);
  } else res.status(500).send(error);
}
