import { prisma } from "../../core/lib/prisma"

export class RoleRepository {
    addRole = async(name : string)=>{
        return await prisma.role.create({
            data : {
                name
            }
        })
    }
    deleteRole = async(roleId : number)=> {
        return await prisma.role.delete({
            where : {
                id : roleId
            }
        })
    }
    updateRole = async(roleId : number,name : string) => {
        return await prisma.role.update({
            where : {
                id : roleId
            },
            data :{
                name
            }
        })
    }
    getRolePermissions = async(roleId : number) => {
        return await prisma.rolePermissions.findMany({
            where : {
                role_id : roleId
            },
            include : {
                permission : true
            }
            
        })
    }
    
}