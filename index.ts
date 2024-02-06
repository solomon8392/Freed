import chokidar from "chokidar";
import { createServer } from "http";
import next from "next";
import { parse } from "url";

const dev = process.env.NODE_ENV !== "production";
const NEXT_PORT = 3000; // Port for the Next.js app

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const nextServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url ?? "", true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  });

  nextServer.once("error", (err) => {
    console.error(err);
    process.exit(1);
  });

  nextServer.listen(NEXT_PORT, () => {
    console.log(`🔥 [next server]: running at http://localhost:${NEXT_PORT}`);
  });

  function startPollServer() {
    const pollServer = require("./backend") as unknown as () => Promise<void>;
    pollServer();

    console.log(`🔥 [backend poll service]: running`);
  }

  function restartPollServer() {
    // TODO: make poll function restartable
  }

  startPollServer();
  chokidar.watch("./backend").on("all", (event, at) => {
    if (event === "add") {
      console.log("Watching for", at);
    }

    if (event === "change") {
      console.log("Changes at", at);
      restartPollServer();
    }
  });
});
