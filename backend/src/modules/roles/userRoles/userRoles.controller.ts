import { Request, response, Response } from "express"
import { ResponseHandler } from "../../../core/lib/response"
import { UserRolesService } from "./userRoles.service"

export class UserRolesController {
    private responseHandler : ResponseHandler
    private userRolesService : UserRolesService
    constructor(responseHandler : ResponseHandler,userRolesService : UserRolesService){
        this.responseHandler = responseHandler
        this.userRolesService = userRolesService
    }


    
    giveRole = async(req:Request,res:Response) => {
        const {roleId,userId} = req.body
        const user = req.user
        try {
            await this.userRolesService.giveRoleService(userId,user,Number(roleId))
            this.responseHandler.successResponse(res,"Give role to user successfully!",200)
        } catch(error : any){
            this.responseHandler.errorResponse(res,error.message)
        }

    }
    removeRole = async(req:Request,res:Response) => {
        const {roleId,userId} = req.body
        const user = req.user
        try {
            await this.userRolesService.removeRoleService(userId,user.id,roleId)
            this.responseHandler.successResponse(res,"Removed Role from user successfully!",200)
        }catch(error : any){
            this.responseHandler.errorResponse(res,error.message)
        }
    }
}