import express, { Router } from "express";
import { Driver } from "neo4j-driver";
import { routeHandler } from "../router/route-handler";
import { GetUser } from "./application/getUser";
import { PostUser } from "./application/postUser";
import { PostUserFollow } from "./application/postUserFollow";
import { getUser } from "./infrastructure/handlers/getUser";
import { postUser } from "./infrastructure/handlers/postUser";
import { postUserFollow } from "./infrastructure/handlers/postUserFollow";
import { Neo4jUserRepository } from "./infrastructure/repositories/neo4jUserRepository";

const router = express.Router();

type UserModule = {
  router: Router;
};

export function createModule(graphDriver: Driver): UserModule {
  const neo4jRepository = new Neo4jUserRepository(graphDriver);
  const getUserController = getUser(new GetUser());
  const postUserController = postUser(new PostUser(neo4jRepository));
  const postUserFollowController = postUserFollow(
    new PostUserFollow(neo4jRepository)
  );

  router.get("/:id(\\d{6})", routeHandler(getUserController));
  router.post("/", routeHandler(postUserController));
  router.post("/follow", routeHandler(postUserFollowController));

  return { router };
}
