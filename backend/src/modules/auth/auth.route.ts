import express, { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";
import { ResponseHandler } from "../../core/lib/response";
import limiter from "../../middlewares/rateLimit";
import { UserRolesRepository } from "../roles/userRoles/userRoles.repository";
import { UserRolesService } from "../roles/userRoles/userRoles.service";
import { authMiddleware } from "../../middlewares/auth.middleware";

const authRouter: Router = express.Router();
const userRolesRepository = new UserRolesRepository()
const authRepositoryInstance = new AuthRepository();
const userRolesService = new UserRolesService(userRolesRepository);


const authServiceInstance = new AuthService(authRepositoryInstance,userRolesService);
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
authRouter.post("/logout",limiter,authMiddleware,authController.logoutUser)
export default authRouter;
