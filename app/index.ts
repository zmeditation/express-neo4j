import express from "express";
import bodyParser from "body-parser";
import { createConfig } from "./config";
import { handleError } from "./errors";
import { createDriver } from "./graph/driver";
import { createModule as createUserModule } from "./users/index";

const PORT = 8000;

(async function main() {
  const app = express();
  const config = createConfig();
  const graphDriver = await createDriver(config);

  app.use(bodyParser.json());

  app.get("/test", (_, res) => res.send("Hello world"));

  app.use("/users", createUserModule(graphDriver).router);

  app.use(handleError);

  app.listen(PORT, () =>
    console.log(`server listening on http://localhost:${PORT}`)
  );
})();
