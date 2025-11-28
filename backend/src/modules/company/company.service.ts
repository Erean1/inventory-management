import { User } from "@prisma/client";
import { ICreateCompany, IUpdateCompany } from "./dtos/company.dto";
import { CustomError } from "../../lib/customError";
import { CompanyRepository } from "./company.repository";
import { Company } from "../../generated/prisma";

export class CompanyService {
  private companyRepository: CompanyRepository;
  constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
  }
  public createCompanyService = async (body: ICreateCompany,user : User): Promise<Company | null> => {
      const isExists = await this.companyRepository.findByName(body.name)
      if (isExists) throw new CustomError("Company name must be unique")
      const newCompany = await this.companyRepository.createCompany(body,user.id);
      return newCompany
 
  };
  public getOwnCompaniesService = async (userId : number) => {
        const companies = await this.companyRepository.getOwnCompanies(userId)
        return companies
  }
  public deleteCompanyService = async(userId : number,companyId : number):Promise<Company | null> => {
    const company = await this.companyRepository.findById(companyId);
    const isMatch = userId === company?.owner_id;
    if (!isMatch) throw new CustomError("U cant delete others companies")
    const deletedCompany = await this.companyRepository.deleteCompany(companyId);
    return deletedCompany
  }
  public updateCompanyService = async(userId:number,companyId:number,body:IUpdateCompany) : Promise<Company |null> => {
    const updateData : any= {}
    if (body.name) updateData.name = body.name
    if (body.description) updateData.description = body.description
    if (body.owner_id) updateData.owner_id = body.owner_id

    const company = await this.companyRepository.findById(companyId)

    const isMatch = userId === company?.owner_id;
    if (!isMatch) throw new CustomError("U cant delete others companies")
      
    const updatedCompany = await this.companyRepository.updateCompany(companyId,body)
    return updatedCompany
  } 
}
