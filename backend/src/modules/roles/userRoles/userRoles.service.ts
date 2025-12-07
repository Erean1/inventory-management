import { auditLogHelper } from "../../auditLogs/auditLogHelper";
import { UserRolesRepository } from "./userRoles.repository";

export class UserRolesService {
  private userRolesRepository: UserRolesRepository;
  constructor(userRolesRepository: UserRolesRepository) {
    this.userRolesRepository = userRolesRepository;
  }
  getUserRoles = async (userId : number) => {
    return await this.userRolesRepository.getUserRoles(userId)
  };
  giveRoleService = async (userId: number, reqUser: any, roleId: number,ip?:any) => {
    auditLogHelper("Give role to user",reqUser.id,ip,"Role",roleId)
    return await this.userRolesRepository.giveRole(
      userId,
      roleId,
      reqUser.username || reqUser
    );
  };
  removeRoleService = async (
    userId: number,
    reqUserId: number,
    roleId: number,
    ip?: any
  ) => {
    auditLogHelper("Role removed from user",reqUserId,ip,"UserRole",userId)
    return await this.userRolesRepository.removeRole(userId, roleId);
  };
}
