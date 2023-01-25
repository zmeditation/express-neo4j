import { Request, RequestHandler } from "express";
import { PostUser, PostUserPayload } from "../../application/postUser";

type PostUserController = (postUserService: PostUser) => RequestHandler;

export const postUser: PostUserController =
  (postUserService: PostUser) => async (req: Request) => {
    const payload = req.body as PostUserPayload;
    return postUserService.execute({
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
    });
  };
