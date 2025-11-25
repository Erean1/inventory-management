import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { PORT } from "./config/env.config";
import http from "http";
import router from "./routes/index.route";
import limiter from "./middlewares/rateLimit";

const app: Application = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(limiter)
app.use("/api", router);

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
