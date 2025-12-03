import express from "express";
import { ResponseHandler } from "../../core/lib/response";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import limiter from "../../middlewares/rateLimit";
import { authMiddleware } from "../../middlewares/auth.middleware";

const userRouter = express.Router();

const responseHandler = new ResponseHandler();
const userRepository = new UserRepository();

const userService = new UserService(userRepository);

const userController = new UserController(responseHandler, userService);

userRouter.get("/",limiter,authMiddleware,userController.getUsers)
userRouter.post("/:userId",limiter,authMiddleware,userController.updateUser)
userRouter.delete("/:userId",limiter,authMiddleware,userController.deleteUser)
export default userRouter;
