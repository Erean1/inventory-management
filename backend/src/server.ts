import app from "./app";
import { PORT } from "./config/env.config";
import http from "http";
const server = http.createServer(app);
const port = PORT
const startServer = () => {
  try {
    server.listen(port || 5000, () => {
      console.log("Server Started at localhost:5000");
    });
  } catch (error) {
    console.error(error);
  }
};
startServer();
