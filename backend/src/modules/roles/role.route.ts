import express from "express";
import limiter from "../../middlewares/rateLimit";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { RoleController } from "./role.controller";
import { ResponseHandler } from "../../core/lib/response";
import { RoleService } from "./role.service";
import { RoleRepository } from "./role.repository";
import userRolesRouter from "./userRoles/userRoles.route";

const roleRouter = express.Router();

const responseHandler = new ResponseHandler();
const roleRepository = new RoleRepository();

const roleService = new RoleService(roleRepository);

const roleController = new RoleController(responseHandler, roleService);

roleRouter.post("/", limiter, authMiddleware,roleController.addRole);
roleRouter.put("/:roleId", limiter, authMiddleware,roleController.updateRole);
roleRouter.delete("/:roleId", limiter, authMiddleware,roleController.deleteRole);

// UserRoles
roleRouter.use(userRolesRouter)

export default roleRouter;
