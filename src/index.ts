import express from "express";
import Hull from "hull";
import { server } from "./server";

require("dotenv").config();

if (process.env.LOG_LEVEL) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ((Hull as any).logger.transports as any).console.level =
    process.env.LOG_LEVEL;
}

const config = {
  hostSecret: process.env.SECRET || "SECRET",
  port: process.env.PORT || 8075,
  timeout: process.env.CLIENT_TIMEOUT || "25s",
};

const connector = new (Hull as any).Connector(config);
const app = express();

connector.setupApp(app);

server(app);
connector.startApp(app);
