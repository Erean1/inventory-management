import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/index.route";
import limiter from "./middlewares/rateLimit";

const app: Application = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(limiter)
app.use("/api", router);
export default app