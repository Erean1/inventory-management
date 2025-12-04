import { Request, Response } from "express";
import { ResponseHandler } from "../../core/lib/response";
import { RoleService } from "./role.service";

export class RoleController {
  private responseHandler: ResponseHandler;
  private roleService: RoleService;
  constructor(responseHandler: ResponseHandler, roleService: RoleService) {
    this.responseHandler = responseHandler;
    this.roleService = roleService;
  }
  addRole = async(req: Request, res: Response) => {
    const name = req.body.name
    try {
        await this.roleService.addRole(name)
        this.responseHandler.successResponse(res,"Role added successfully",201)
    } catch (error: any) {
      this.responseHandler.errorResponse(res, error.message);
    }
  };
  updateRole = async(req: Request, res: Response) => {
    const roleId = req.params.roleId
    const name = req.body.name
    try {
        await this.roleService.updateRole(Number(roleId),name)
        this.responseHandler.successResponse(res,"Role updated successfully",200)
    } catch (error: any) {
      this.responseHandler.errorResponse(res, error.message);
    }
  };
  deleteRole = async(req: Request, res: Response) => {
    const roleId = req.params.roleId
    try {
        await this.roleService.deleteRole(Number(roleId))
        this.responseHandler.successResponse(res,"Role deleted successfully",204)
    } catch (error: any) {
      this.responseHandler.errorResponse(res, error.message);
    }
  };
}
