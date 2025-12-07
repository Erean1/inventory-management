import { NextFunction, Request, Response } from "express"
import { UserRolesService } from "../modules/roles/userRoles/userRoles.service";
import { UserRolesRepository } from "../modules/roles/userRoles/userRoles.repository";
import { RoleService } from "../modules/roles/role.service";
import { RoleRepository } from "../modules/roles/role.repository";
import { ResponseHandler } from "../core/lib/response";

const userRolesRepository = new UserRolesRepository()
const userRolesService = new UserRolesService(userRolesRepository)
const responseHandler = new ResponseHandler()
const roleRepository = new RoleRepository()
const roleService = new RoleService(roleRepository)

export const roleGuard = (requiredPermissions : string[]) => {
  return async(req:Request,res:Response,next:NextFunction) => {
    // requiredPermissions = ["admin.product.create","user.product.view"]
      const user = req.user;
      if (!user) return responseHandler.errorResponse(res,"Unauthorized",401)
      const roles = await userRolesService.getUserRoles(user.id) 
      const userRoles = roles.map((role) => role.Role); / map içinde await yapılmaz! /  
      let userPermissions = []
      for (let role of userRoles) {
        const permissions = await roleService.getRolePermissions(role.id,user.id);
        userPermissions.push(...permissions) // eğer ...permissions yapmazsak her gelen diğerinin üzerine yazar 
      }
      const requiredPermission = requiredPermissions.map((requiredPermission) => requiredPermission.split(".")[1]+ "." + requiredPermission.split(".")[2] )
      const isAccess =  userPermissions.some((userPermission) => requiredPermission.includes(userPermission.permission.name));
      if (!isAccess) return responseHandler.errorResponse(res,"Access Denied",403);
      next()

  }
} 