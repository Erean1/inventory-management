import { IUpdateUserDto } from "./dtos/updateUser.dto";
import { UserRepository } from "./user.repository";

export class UserService{
    private userRepository : UserRepository
    constructor(userRepository : UserRepository){
        this.userRepository = userRepository
    }
    getUsersService = async(userId : number) => {
        return await this.userRepository.getUsers()
    }
    updateUserService = async(reqUserId : number,userId : number,body : IUpdateUserDto) => {
        return await this.userRepository.updateUser(userId,body)
    }
    deleteUserService = async(userId: number,reqUserId : number) => {
        return await this.userRepository.deleteUser(userId)
    }
}