import { Request, response, Response } from "express";
import { ResponseHandler } from "../lib/response";
import { createCompanySchema, updateCompanySchema } from "../validation/company.validation";
import { CompanyService } from "../services/company.service";

export class CompanyController {
    private responseHandler : ResponseHandler
    private companyService : CompanyService
    constructor(companyService : CompanyService,responseHandler :ResponseHandler){
        this.companyService = companyService,
        this.responseHandler = responseHandler
    }
    public createCompany = async(req:Request,res:Response) :Promise<void>=> {
        const body = createCompanySchema.parse({
            ...req.body
        })
        const user = req.user
        try {
            const newCompany = await this.companyService.createCompanyService(body,user)
            this.responseHandler.successResponse(res,"Company Created",201,newCompany)
        } catch(error : any){
            this.responseHandler.errorResponse(res,error.message)
        }
    }
    public getOwnCompanies = async(req:Request,res:Response) => {
        const user = req.user
        try {
            const myCompanies = await this.companyService.getOwnCompaniesService(user.id) 
            this.responseHandler.successResponse(res,"Get Own Companies Success!",200,myCompanies)
        } catch(error : any){
            this.responseHandler.errorResponse(res,error.message)
        }
    }
    public deleteOwnCompany = async(req:Request,res:Response) => {
        const user = req.user;
        const companyId = req.params.id
        try {
            const deletedCompany = await this.companyService.deleteCompanyService(user.id,Number(companyId));
            this.responseHandler.successResponse(res,"Company Deleted Success!",204)  
        } catch(error : any){
            this.responseHandler.errorResponse(res,error.message)
        }
    }
    public updateOwnCompany = async(req:Request,res:Response) => {
        const user = req.user;
        const companyId = req.params.id
        const body = updateCompanySchema.parse({
            ...req.body
        })
        try{
            const updatedCompany = await this.companyService.updateCompanyService(user.id,Number(companyId),body)
            this.responseHandler.successResponse(res,"Company Updated Successfully!",200,updatedCompany)
        } catch(error:any){
            this.responseHandler.errorResponse(res,error.message)
        }
    }
}