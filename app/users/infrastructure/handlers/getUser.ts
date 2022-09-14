import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { GetUser } from "../../application/getUser";

type GetUserController = (getUserService: GetUser) => RequestHandler;

export const getUser: GetUserController =
  (getUserService: GetUser) => async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await getUserService.execute(id);
    return res.status(StatusCodes.OK).send({
      Id: "123456",
      firstName: "joe",
      lastName: "olley",
      email: "joe@nate.tech",
    });
  };
