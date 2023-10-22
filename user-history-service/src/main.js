import "dotenv/config.js";
import express from "express";
import { UserHistoryRouterBootstrap } from "./UserHistory/UserHistory.router.js";
import bodyParser from "body-parser";

async function bootstrap() {
  const app = express();

  const userHistorySubrouter = UserHistoryRouterBootstrap();

  app.use(bodyParser.json());

  app.use("/", userHistorySubrouter);

  app.listen(3000, () => console.log("Application started!"));
}

bootstrap();
