import { auditLogHelper } from "../auditLogs/auditLogHelper"
import { RoleRepository } from "./role.repository"

export class RoleService {
    private roleRepository : RoleRepository
    constructor(roleRepository : RoleRepository){
        this.roleRepository = roleRepository
    }
    addRole = async(name : string,userId : number,ip?:any) => {
        auditLogHelper("Role added",userId,ip,"Role",0)
        return await this.roleRepository.addRole(name)
    }
    updateRole = async(roleId : number,name : string,userId : number,ip?:any) => {
        auditLogHelper("Role updated",userId,ip,"Role",roleId)
        return await this.roleRepository.updateRole(roleId,name)
    }
    deleteRole = async(roleId : number,userId : number,ip?:any) => {
        auditLogHelper("Role deleted",userId,ip,"Role",roleId)
        return await this.roleRepository.deleteRole(roleId)
    }
    getRolePermissions = async(roleId : number,userId : number,ip?:any) => {
        auditLogHelper("Get role permissions",userId,ip,"Role",roleId)
        return await this.roleRepository.getRolePermissions(roleId)
    }
}