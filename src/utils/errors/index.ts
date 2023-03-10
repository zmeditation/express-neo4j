import { StatusCodes } from "http-status-codes";

class CustomError extends Error {
  constructor(readonly code: number) {
    super();
  }
}

export class ResourceNotFound extends CustomError {
  constructor() {
    super(StatusCodes.NOT_FOUND);
    this.message = "Resource not found";
  }
}
