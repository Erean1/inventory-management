import { RoleRepository } from "./role.repository"

export class RoleService {
    private roleRepository : RoleRepository
    constructor(roleRepository : RoleRepository){
        this.roleRepository = roleRepository
    }
    addRole = async(name : string) => {
        return await this.roleRepository.addRole(name)
    }
    updateRole = async(roleId : number,name : string) => {
        return await this.roleRepository.updateRole(roleId,name)
    }
    deleteRole = async(roleId : number) => {
        return await this.roleRepository.deleteRole(roleId)
    }
    getRolePermissions = async(roleId : number) => {
        return await this.roleRepository.getRolePermissions(roleId)
    }
}