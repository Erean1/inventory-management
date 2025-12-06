
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
    memberList = async(companyId : number,userId : number) => {
        await this.companyService.isOwner(userId,companyId)
        return await this.companyMemberRepository.getCompanyMembers(companyId)
    }
    addMember = async(companyId : number,userId : number,memberId : number,role : string) => {
        await this.companyService.isOwner(userId,companyId)
        await this.companyMemberRepository.addCompanyMember(companyId,memberId,role)
    }
    removeMember = async(companyId : number,userId : number,memberId : number,role : string) => {
        await this.companyService.isOwner(userId,companyId)
        await this.companyMemberRepository.removeCompanyMember(companyId,memberId,role)
    }
    memberRole = async(companyId : number,userId : number,memberId : number,role : string) => {
        await this.companyService.isOwner(userId,companyId)
        await this.companyMemberRepository.giveRole(companyId,memberId,role)
    }
} 