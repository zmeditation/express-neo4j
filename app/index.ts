import express from "express";
import { routeHandler } from "./router/route-handler";
import { handleError, ResourceNotFound } from "./errors";
import { getUser } from "./users/infrastructure/handlers/getUser";
import { GetUser } from "./users/application/getUser";

const PORT = 8000;

(function main() {
  let app = express();

  app.get("/test", (_, res) => res.send("Hello world"));

  const getUserController = getUser(new GetUser());
  app.get("/user/:id", routeHandler(getUserController));

  app.use(handleError);

  app.listen(PORT, () =>
    console.log(`server listening on http://localhost:${PORT}`)
  );
})();
