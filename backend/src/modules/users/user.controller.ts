import { Request, Response } from "express";
import { ResponseHandler } from "../../core/lib/response";
import { UserService } from "./user.service";
import { updateUserSchema } from "./user.validation";

export class UserController {
    private responseHandler : ResponseHandler
    private userService : UserService
    constructor(responseHandler : ResponseHandler,userService : UserService){
        this.responseHandler = responseHandler
        this.userService = userService
    }
    getUsers = async(req:Request,res:Response) =>  {
        try {
            const user = req.user
            const users  = await this.userService.getUsersService(user.id,req.ip)
            this.responseHandler.successResponse(res,"Get Users Successfully!",200,users)
        } catch(error : any){
            this.responseHandler.errorResponse(res,error.message)
        }
    }
    updateUser = async(req:Request,res:Response) =>  {
        const body = updateUserSchema.parse({
            ...req.body
        })
        const userId = req.params.userId
        const user = req.user
        try {
            await this.userService.updateUserService(user.id,Number(userId),body,req.ip)
        } catch(error : any){
            this.responseHandler.errorResponse(res,error.message)
        }
    }
    deleteUser = async(req:Request,res:Response) =>  {
        const userId = req.params.userId
        const user = req.user
        try {
            return await this.userService.deleteUserService(Number(userId),user.id,req.ip)
        } catch(error : any){
            this.responseHandler.errorResponse(res,error.message)
        }
    }
}