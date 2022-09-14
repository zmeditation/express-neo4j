import express from "express";
import { handleError } from "./errors";
import { createModule as createUserModule } from "./users/index";
const PORT = 8000;

(function main() {
  const app = express();

  app.get("/test", (_, res) => res.send("Hello world"));

  app.use("/users", createUserModule().router);

  app.use(handleError);

  app.listen(PORT, () =>
    console.log(`server listening on http://localhost:${PORT}`)
  );
})();
