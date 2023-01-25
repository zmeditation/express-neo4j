import { Request, RequestHandler } from "express";
import {
  PostUserFollow,
  PostUserFollowPayload,
} from "../../application/postUserFollow";

type PostUserFollowController = (
  postUserFollowService: PostUserFollow
) => RequestHandler;

export const postUserFollow: PostUserFollowController =
  (postUserFollowService: PostUserFollow) => async (req: Request) => {
    const payload = req.body as PostUserFollowPayload;
    return postUserFollowService.execute({
      actorId: payload.actorId,
      subjectId: payload.subjectId,
    });
  };
