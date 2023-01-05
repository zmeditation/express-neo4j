import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { PostUser, PostUserPayload } from "../../application/postUser";

type PostUserController = (postUserService: PostUser) => RequestHandler;

export const postUser: PostUserController =
  (postUserService: PostUser) => async (req: Request, res: Response) => {
    const payload = req.body as PostUserPayload;
    const result = await postUserService.execute({
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
    });
    return res.status(StatusCodes.OK).send(result);
  };
