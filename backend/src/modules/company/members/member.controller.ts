import { Request, Response } from "express"
import { ResponseHandler } from "../../../core/lib/response"
import { CompanyMemberService } from "./member.service"

export class CompanyMemberController {
    private companyMemberService : CompanyMemberService
    private responseHandler : ResponseHandler
    constructor(companyMemberService : CompanyMemberService,responseHandler : ResponseHandler) {
        this.companyMemberService = companyMemberService
        this.responseHandler = responseHandler
    }
    memberList = async(req:Request,res:Response) : Promise<void>=> {
        const companyId = req.params.companyId
        const user = req.user
        try {
            const companyMembers = await this.companyMemberService.memberList(Number(companyId),user.id)
            this.responseHandler.successResponse(res,"Get CompanyMembers successfully!",200,companyMembers)
        } catch(error : any){
            this.responseHandler.errorResponse(res,error.message)
        }
    } 
    addMember = async(req:Request,res:Response) : Promise<void> => {
        const companyId = req.params.companyId;
        const {memberId,role} = req.body;
        const user = req.user
        try {
            await this.companyMemberService.addMember(Number(companyId),user.id,Number(memberId),role);
            this.responseHandler.successResponse(res,"Member added to company successfully!",200)
        } catch(error: any){
            this.responseHandler.errorResponse(res,error.message)
        }
    }
    removeMember = async(req:Request,res:Response) : Promise<void> => {
        const companyId = req.params.companyId;
        const {memberId,role} = req.body;
        const user = req.user
        try {
            await this.companyMemberService.removeMember(Number(companyId),user.id,Number(memberId),role);
            this.responseHandler.successResponse(res,"Member removed from company successfully!",200)
        } catch(error: any){
            this.responseHandler.errorResponse(res,error.message)
        }
    }
    memberRole = async(req:Request,res:Response) : Promise<void> => {
        const companyId = req.params.companyId;
        const {memberId,role} = req.body;
        const user = req.user
        try {
            await this.companyMemberService.memberRole(Number(companyId),user.id,Number(memberId),role);
            this.responseHandler.successResponse(res,"Give role to member successfully!",200)
        } catch(error: any){
            this.responseHandler.errorResponse(res,error.message)
        }
    }
 
}