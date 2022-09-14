import express, { Router } from "express";
import { routeHandler } from "../router/route-handler";
import { GetUser } from "./application/getUser";
import { getUser } from "./infrastructure/handlers/getUser";

const router = express.Router();

type UserModule = {
  router: Router;
};

export function createModule(): UserModule {
  const getUserController = getUser(new GetUser());
  router.get("/:id(\\d{6})", routeHandler(getUserController));
  return { router };
}
