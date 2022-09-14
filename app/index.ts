import express from "express";
const PORT = 8000;

(function main() {
  let app = express();

  app.get("/test", (_, res) => res.send("Hello world"));

  app.listen(PORT, () =>
    console.log(`server listening on http://localhost:${PORT}`)
  );
})();
