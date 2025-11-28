import { isOwner } from "../../../core/utils/permissions.utils"
import { CompanyRepository } from "../company.repository"
import { CompanyMemberRepository } from "./member.repository"

export class CompanyMemberService {
    private companyMemberRepository : CompanyMemberRepository
    private companyRepository : CompanyRepository
    constructor(companyMemberRepository: CompanyMemberRepository,companyRepository : CompanyRepository){
        this.companyMemberRepository = companyMemberRepository
        this.companyRepository = companyRepository
    }
    memberList = async(companyId : number,userId : number) => {
        await isOwner(this.companyRepository,userId,companyId)
        return await this.companyMemberRepository.getCompanyMembers(companyId)
    }
    addMember = async(companyId : number,userId : number,memberId : number,role : string) => {
        await isOwner(this.companyRepository,userId,companyId);
        await this.companyMemberRepository.addCompanyMember(companyId,memberId,role)
    }
    removeMember = async(companyId : number,userId : number,memberId : number,role : string) => {
        await isOwner(this.companyRepository,userId,companyId);
        await this.companyMemberRepository.removeCompanyMember(companyId,memberId,role)
    }
    memberRole = async(companyId : number,userId : number,memberId : number,role : string) => {
        await isOwner(this.companyRepository,userId,companyId);
        await this.companyMemberRepository.giveRole(companyId,memberId,role)
    }
} 