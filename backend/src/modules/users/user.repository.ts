import { prisma } from "../../core/lib/prisma"
import { IUpdateUserDto } from "./dtos/updateUser.dto"

export class UserRepository{
    getUsers = async() => {
        return await prisma.user.findMany({
            include : {
                roles : true
            }
        })
    }
    updateUser = async (userId : number,body : IUpdateUserDto) => {
        return await prisma.user.update({
            where : {
                id : userId
            },
            data : {
                ...body
            }
        })
    }
    deleteUser = async (userId : number) => {
        prisma.user.delete({
            where : {
                id : userId
            }
        })
    }
}