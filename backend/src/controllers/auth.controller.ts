import { Request,Response } from "express";
import { loginSchema, registerSchema, resetPasswordSchema, verifyOtpSchema } from "../validation/auth.validation";
import { ResponseHandler } from "../lib/response";
import { AuthService } from "../services/auth.service";
import { cookieHandler } from "../helpers/auth.helpers";


export class AuthController {
    private responseHandler: ResponseHandler;
    private authService: AuthService;
    constructor(authService:AuthService,responseHandler:ResponseHandler){
        this.authService = authService
        this.responseHandler = responseHandler
    }
    public registerUser =  async(req:Request,res:Response) => {   
        const body = registerSchema.parse({
            ...req.body
        });
        try {
            
            await this.authService.registerUserService(body)
            return this.responseHandler.successResponse(res,"Registeration Successfully!",200);
        }catch(error : any){
            return this.responseHandler.errorResponse(res,error.message)
        }
    }
    public loginUser = async (req:Request,res:Response) => {
        const body = loginSchema.parse({
            ...req.body
        });
        try {
            const user = await this.authService.loginUserService(body);
            cookieHandler(res,user)
            
            return this.responseHandler.successResponse(res,"Login successfully!",200,user)

        } catch(error : any){
            return this.responseHandler.errorResponse(res,error.message)
        }
    }
    public verifyUser = async(req:Request,res:Response) => {
        const body = verifyOtpSchema.parse({
            ...req.query
        })
        try {
            await this.authService.verifyUserService(body)

            return this.responseHandler.successResponse(res,"Account Verified Successfully!",200)
        } catch(error : any){
            return this.responseHandler.errorResponse(res,error.message)

        }
    }
    public sendResetOtp = async(req:Request,res:Response) : Promise<void> => {
        const email = req.body.email
        try {
            await this.authService.sendResetOtpService(email);
            this.responseHandler.successResponse(res,"Reset Otp send successfully!",200)
            
        } catch(error : any){
            this.responseHandler.errorResponse(res,error.message)
        }
    }
    public passwordReset = async(req:Request,res:Response) : Promise<void> => {
        const body = resetPasswordSchema.parse({
            ...req.body
        })
        const email = req.query.email
        try {
            await this.authService.resetPasswordService(body,email)
            this.responseHandler.successResponse(res,"Password Reset Success!",200)
        } catch(error : any){
            this.responseHandler.errorResponse(res,error.message)
        }
    }
    public logoutUser = async(req:Request,res:Response) => {
        try {
            await this.authService.logoutService(res)
            this.responseHandler.successResponse(res,"Logout success!")
        } catch(error : any){
            this.responseHandler.errorResponse(res,error.message)
        }
    }
}