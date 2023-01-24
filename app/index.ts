import express from "express";
import { createConfig } from "./config";
import { handleError } from "./errors";
import { createDriver } from "./graph/driver";
import { logger } from "./logger";
import { createModule as createUserModule } from "./users/index";

(async function main() {
  const app = express();
  const config = createConfig();
  const graphDriver = await createDriver(config);

  app.use(express.json());

  const router = express.Router();

  router.get("/test", (_, res) => res.send("Hello world"));

  createUserModule(router, { graphDriver });

  app.use("/v1", router);

  app.use(handleError);

  app.listen(config.port, () =>
    logger.info(`server listening on http://localhost:${config.port}`)
  );
})();
