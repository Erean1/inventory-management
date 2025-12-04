import { UserRolesRepository } from "./userRoles.repository";

export class UserRolesService {
  private userRolesRepository: UserRolesRepository;
  constructor(userRolesRepository: UserRolesRepository) {
    this.userRolesRepository = userRolesRepository;
  }
  getUserRoles = async (userId : number) => {
    return await this.userRolesRepository.getUserRoles(userId)
  };
  giveRoleService = async (userId: number, reqUser: any, roleId: number) => {
    return await this.userRolesRepository.giveRole(
      userId,
      roleId,
      reqUser.username
    );
  };
  removeRoleService = async (
    userId: number,
    reqUserId: number,
    roleId: number
  ) => {
    return await this.userRolesRepository.removeRole(userId, roleId);
  };
}
