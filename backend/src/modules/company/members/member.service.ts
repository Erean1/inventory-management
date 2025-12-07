
import { auditLogHelper } from "../../auditLogs/auditLogHelper"
import { CompanyRepository } from "../company.repository"
import { CompanyService } from "../company.service"
import { CompanyMemberRepository } from "./member.repository"

export class CompanyMemberService {
    private companyMemberRepository : CompanyMemberRepository
    private companyService : CompanyService
    constructor(companyMemberRepository: CompanyMemberRepository,companyService : CompanyService){
        this.companyMemberRepository = companyMemberRepository
        this.companyService = companyService
    }
    memberList = async(companyId : number,userId : number,ip?:any) => {
        await this.companyService.isOwner(userId,companyId)
        auditLogHelper("Get member list",userId,ip,"CompanyMember",0)
        return await this.companyMemberRepository.getCompanyMembers(companyId)
    }
    addMember = async(companyId : number,userId : number,memberId : number,role : string,ip?:any) => {
        await this.companyService.isOwner(userId,companyId)
        auditLogHelper("Add member",userId,ip,"CompanyMember",memberId)
        await this.companyMemberRepository.addCompanyMember(companyId,memberId,role)
    }
    removeMember = async(companyId : number,userId : number,memberId : number,role : string,ip?:any) => {
        await this.companyService.isOwner(userId,companyId)
        auditLogHelper("Remove member",userId,ip,"CompanyMember",memberId)

        await this.companyMemberRepository.removeCompanyMember(companyId,memberId,role)
    }
    memberRole = async(companyId : number,userId : number,memberId : number,role : string,ip?:any) => {
        await this.companyService.isOwner(userId,companyId)
        auditLogHelper("Member role operation",userId,ip,"CompanyMember",memberId)
        await this.companyMemberRepository.giveRole(companyId,memberId,role)
    }
} 