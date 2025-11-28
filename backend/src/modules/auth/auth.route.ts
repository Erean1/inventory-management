import express, { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";
import { ResponseHandler } from "../../lib/response";
import limiter from "../../middlewares/rateLimit";

const authRouter: Router = express.Router();

const authRepositoryInstance = new AuthRepository();

const authServiceInstance = new AuthService(authRepositoryInstance);
const responseHandlerInstance = new ResponseHandler();

const authController = new AuthController(
  authServiceInstance,
  responseHandlerInstance
);

authRouter.post("/register", limiter,authController.registerUser);
authRouter.post("/login", limiter,authController.loginUser);
authRouter.get("/verify", limiter,authController.verifyUser);
authRouter.post("/send-reset-otp",limiter,authController.sendResetOtp)
authRouter.post("/reset-password",limiter,authController.passwordReset)
authRouter.post("/logout",limiter,authController.logoutUser)
export default authRouter;
