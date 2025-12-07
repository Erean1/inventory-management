import { auditLogHelper } from "../auditLogs/auditLogHelper";
import { IUpdateUserDto } from "./dtos/updateUser.dto";
import { UserRepository } from "./user.repository";

export class UserService{
    private userRepository : UserRepository
    constructor(userRepository : UserRepository){
        this.userRepository = userRepository
    }
    getUsersService = async(userId : number,ip? : any) => {
        auditLogHelper("Get users",userId,ip,"User",0)
        return await this.userRepository.getUsers()
    }
    updateUserService = async(reqUserId : number,userId : number,body : IUpdateUserDto,ip?:any) => {
        auditLogHelper("User updated",reqUserId,ip,"User",userId)
        return await this.userRepository.updateUser(userId,body)
    }
    deleteUserService = async(userId: number,reqUserId : number,ip?:any) => {
        auditLogHelper("User deleted",reqUserId,ip,"User",userId)
        return await this.userRepository.deleteUser(userId)
    }
}