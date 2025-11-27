import { ICreateCompany, IUpdateCompany} from "../dto/company.dto";
import { Company } from "../generated/prisma";
import { prisma } from "../lib/prisma";
export class CompanyRepository{

    public async createCompany(body : ICreateCompany,userId : number) : Promise<Company | null> {
            const company = await prisma.company.create({
                data : {
                    name : body.name,
                    description : body.description,
                    owner_id : userId
                }
            })
            return company

    }
    public async findByName(name : string): Promise<Company|null>{
            const company = await prisma.company.findFirst({
                where : {
                    name : name
                }
            })
            return company
    }
    public async getOwnCompanies(userId : number ): Promise<Company[]>{
            const companies = await prisma.company.findMany({
                where : {
                    owner_id : userId
                }
            })
            return companies
    } 
    public async findById(companyId : number) : Promise<Company | null>{
        const company = await prisma.company.findFirst({
            where : {
                id : companyId
            }
        })
        return company
    } 
    public async deleteCompany(companyId : number): Promise<Company |null>{
        const deletedCompany = await prisma.company.delete({
            where:{
                id : companyId
            }
        }) 
        return deletedCompany
    }
    public async updateCompany(companyId : number,updateData:IUpdateCompany): Promise<Company|null>{
        const updatedCompany = await prisma.company.update({
            where : {
                id : companyId
            },
            data : updateData
        })
        return updatedCompany
    }
}