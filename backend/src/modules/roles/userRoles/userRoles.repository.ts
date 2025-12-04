import { prisma } from "../../../core/lib/prisma"

export class UserRolesRepository {

    giveRole = async(userId : number,roleId : number,assigned_by : string) => {
        return await prisma.rolesOnUsers.create({
            data : {
                user_id : userId,
                role_id : roleId,
                assigned_by
            }
        })
    }
    removeRole = async(userId : number,roleId : number) => {
        return await prisma.rolesOnUsers.delete({
            where : {
                role_id_user_id : {
                    role_id : roleId,
                    user_id : userId
                }
            }
        })
    }
    getUserRoles = async(userId : number) => {
        return await prisma.rolesOnUsers.findMany({
            where : {
                user_id : userId
            },
            include : {
                Role : true
            }
        })
    }
} 