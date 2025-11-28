import { Response } from "express";

export class ResponseHandler {
    constructor() {}

    public successResponse(res : Response,message : string,code:number = 200,data : any = null){
        return(
            res.status(code).json({success:true,message,data})
        )
    }
    public errorResponse(res:Response,message:string,code:number=500){
        return(
            res.status(code).json({success:false,message})
        )
    }
}