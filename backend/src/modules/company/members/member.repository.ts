import { CompanyMember, CompanyRole } from "../../../generated/prisma"
import {prisma} from "../../../core/lib/prisma"

export class CompanyMemberRepository {
    getCompanyMembers = async(companyId : number) : Promise<CompanyMember[] | null> => {
        return await prisma.companyMember.findMany({
            where : {
                company_id : companyId
            }
        })
    }
    addCompanyMember = async(companyId : number,memberId : number ,role : string) => {
        return prisma.companyMember.create({
            data : {
                company_id : companyId,
                member_id : memberId,
                role : role as CompanyRole
            }
        })
    }
    removeCompanyMember = async(companyId : number,memberId : number,role : string) => {
        return prisma.companyMember.delete({
            where : {
                member_id_company_id : {
                    company_id : companyId,
                    member_id : memberId
                }
            }
        })
    }
    giveRole = async(companyId : number,memberId : number,role : string) => {
        return prisma.companyMember.update({
            where : {
                member_id_company_id :{
                    company_id : companyId,
                    member_id : memberId
                }
            },
            data : {
                role : role as CompanyRole
            }
        })
    }
}