import { User } from "@prisma/client";
import { ICreateCompany, IUpdateCompany } from "./dtos/company.dto";
import { CustomError } from "../../core/lib/customError";
import { CompanyRepository } from "./company.repository";
import { Company } from "../../generated/prisma";
import { auditLogService } from "../auditLogs";
import { auditLogHelper } from "../auditLogs/auditLogHelper";

export class CompanyService {
  private companyRepository: CompanyRepository;
  constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
  }
  isCompanyExists = async(companyId : number) : Promise<void>=> {
    const company = await this.companyRepository.findById(companyId);
    if (!company) throw new CustomError("Company not found",404);
  }
  isOwner = async(userId : number,companyId : number) : Promise<void>=> {
    const company = await this.companyRepository.findById(companyId);
    if (!company) throw new CustomError("Company not found",404);
    if (company.owner_id !== userId) throw new CustomError("Only company owner can this operation")
  }
  public createCompanyService = async (body: ICreateCompany,user : User,ip?:any): Promise<Company | null> => {
      const isExists = await this.companyRepository.findByName(body.name)
      if (isExists) throw new CustomError("Company name must be unique")
      const newCompany = await this.companyRepository.createCompany(body,user.id);
      auditLogHelper("Company Create",user.id,ip,"Company",newCompany?.id!)
      return newCompany
  };
  public getOwnCompaniesService = async (userId : number,ip?:any) => {
        const companies = await this.companyRepository.getOwnCompanies(userId)
        auditLogHelper("Get own companies",userId,ip,"Company",0)

        return companies
  }
  public deleteCompanyService = async(userId : number,companyId : number,ip?:any):Promise<Company | null> => {
    const company = await this.companyRepository.findById(companyId);
    const isMatch = userId === company?.owner_id;
    if (!isMatch) throw new CustomError("U cant delete others companies")
    const deletedCompany = await this.companyRepository.deleteCompany(companyId);
      auditLogHelper("Company Create",userId,ip,"Company",company.id)

    return deletedCompany
  }
  public updateCompanyService = async(userId:number,companyId:number,body:IUpdateCompany,ip?:any) : Promise<Company |null> => {
    const updateData : any= {}
    if (body.name) updateData.name = body.name
    if (body.description) updateData.description = body.description
    if (body.owner_id) updateData.owner_id = body.owner_id

    const company = await this.companyRepository.findById(companyId)

    const isMatch = userId === company?.owner_id;
    if (!isMatch) throw new CustomError("U cant delete others companies")
      
    const updatedCompany = await this.companyRepository.updateCompany(companyId,body)
      auditLogHelper("Company Create",userId,ip,"Company",company.id)

    return updatedCompany
  } 
}
