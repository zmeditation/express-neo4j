import { Router } from "express";
import { Driver } from "neo4j-driver";
import { routeHandler } from "../router/route-handler";
import { GetUser } from "./application/getUser";
import { PostUser } from "./application/postUser";
import { PostUserFollow } from "./application/postUserFollow";
import { getUser } from "./infrastructure/handlers/getUser";
import { postUser } from "./infrastructure/handlers/postUser";
import { postUserFollow } from "./infrastructure/handlers/postUserFollow";
import { Neo4jUserRepository } from "./infrastructure/repositories/neo4jUserRepository";

type Dependencies = {
  graphDriver: Driver;
};

export function createModule(
  router: Router,
  { graphDriver }: Dependencies
): void {
  const neo4jRepository = new Neo4jUserRepository(graphDriver);
  const getUserController = getUser(new GetUser(neo4jRepository));
  const postUserController = postUser(new PostUser(neo4jRepository));
  const postUserFollowController = postUserFollow(
    new PostUserFollow(neo4jRepository)
  );

  router.get("/users/:id([a-z0-9-]{36})", routeHandler(getUserController));
  router.post("/users", routeHandler(postUserController));
  router.post("/users/follow", routeHandler(postUserFollowController));
}
