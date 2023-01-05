import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  PostUserFollow,
  PostUserFollowPayload,
} from "../../application/postUserFollow";

type PostUserFollowController = (
  postUserFollowService: PostUserFollow
) => RequestHandler;

export const postUserFollow: PostUserFollowController =
  (postUserFollowService: PostUserFollow) =>
  async (req: Request, res: Response) => {
    const payload = req.body as PostUserFollowPayload;
    const result = await postUserFollowService.execute({
      actorId: payload.actorId,
      subjectId: payload.subjectId,
    });
    return res.status(StatusCodes.OK).send(result);
  };
