import express from "express";
import { ResponseHandler } from "../../../core/lib/response";
import { UserRolesController } from "./userRoles.controller";
import { UserRolesService } from "./userRoles.service";
import { UserRolesRepository } from "./userRoles.repository";
import limiter from "../../../middlewares/rateLimit";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { roleGuard } from "../../../middlewares/roleGuard.middleware";

const userRolesRouter = express.Router();

const responseHandler = new ResponseHandler();
const userRolesRepository = new UserRolesRepository();

const userRolesService = new UserRolesService(userRolesRepository);

const userRolesController = new UserRolesController(
  responseHandler,
  userRolesService
);

userRolesRouter.post("/giveRole",limiter,authMiddleware,userRolesController.giveRole)

export default userRolesRouter;
