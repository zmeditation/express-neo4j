import { Request, RequestHandler } from "express";
import { GetUser } from "../../application/getUser";

type GetUserController = (getUserService: GetUser) => RequestHandler;

export const getUser: GetUserController =
  (getUserService: GetUser) => async (req: Request) => {
    const id = req.params.id;
    return getUserService.execute(id);
  };
