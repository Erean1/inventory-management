import { Response } from "express";
import {
  RegisterUserDto,
  resetPasswordDto,
  verifyUserDto,
} from "./dtos/auth.dto";
import {
  expireDateHandlerBasedMinutes,
  generateOtp,
  hashComparer,
  hashPassword,
  mailSender,
} from "./auth.helpers";
import { CustomError } from "../../core/lib/customError";
import { AuthRepository } from "./auth.repository";
import { UserRolesService } from "../roles/userRoles/userRoles.service";
import { auditLogService } from "../auditLogs";
import { auditLogHelper } from "../auditLogs/auditLogHelper";
export class AuthService {
  private authRepository: AuthRepository;
  private userRolesService : UserRolesService
  constructor(authRepository: AuthRepository,userRolesService : UserRolesService) {
    this.authRepository = authRepository;
    this.userRolesService = userRolesService
  }

  public async registerUserService(body: RegisterUserDto,ip? : any) {
    try {
      const { email, password, username } = body;
      const isExists = await this.authRepository.findByEmail(email) || await this.authRepository.findByUsername(username);
      if (isExists) {
        throw new CustomError("existing user");
      }
      let verifyOtp = await generateOtp();
      const user = await this.authRepository.createUser(body, verifyOtp);
      await this.userRolesService.giveRoleService(user.id,"SYSTEM",1)
      let link = `http://localhost:5000/api/auth/verify?email=${email}&verifyOtp=${verifyOtp}`;
      await mailSender(
        email,
        "VERIFY OTP",
        `Your Otp CODE is ${verifyOtp} click To link and verify your account ${link}`
      );
      user.verify_otp = verifyOtp;
      auditLogHelper("Register",user.id,ip,"User",user.id)
      return user;
    } catch (error: any) {
      throw new CustomError(error.message);
    }
  }

  public loginUserService = async (body: any,ip? : any) => {
    const { email, username, password } = body;
    try {
      let user;
      username
        ? (user = await this.authRepository.findByUsername(username))
        : (user = await this.authRepository.findByEmail(email));

      if (!user) throw new CustomError("User not found", 404);
      const isMatch = await hashComparer(user.password, password);
      if (!isMatch) throw new CustomError("Wrong password");
      if (user && user.is_verified === false)
        throw new CustomError("User not verified,verify your account first!");
      auditLogHelper("Login",user.id,ip,"User",user.id)

      return user;
    } catch (error: any) {
      throw new CustomError(error.message);
    }
  };

  public verifyUserService = async (body: verifyUserDto,ip? : any) => {
    const { verifyOtp, email } = body;
    try {
      const user = await this.authRepository.findByEmail(email);
      if (!user) throw new CustomError("User Not Found", 404);
      const isOtpMatch = user?.verify_otp && user.verify_otp == verifyOtp;

      const isOtpExpired =
        user?.verify_otp &&
        user.verify_otp_expire_at !== null &&
        user.verify_otp_expire_at?.getTime() < new Date().getTime();
      if (!isOtpMatch) throw new CustomError("Verify otp doesn't match", 400);
      if (isOtpExpired) throw new CustomError("Verify Otp expired");
      auditLogHelper("Verify",user.id,ip,"User",user.id)

      user.verify_otp = "";
      user.verify_otp_expire_at = null;
      await this.authRepository.updateUserVerified(user);
    } catch (error: any) {
      throw new CustomError(error.message);
    }
  };

  public sendResetOtpService = async (email: string,ip? : any): Promise<void> => {
    try {
      const user = await this.authRepository.findByEmail(email);

      if (!user) throw new CustomError("User not found", 404);

      const resetOtpExpireAt = expireDateHandlerBasedMinutes(5);
      const resetOtp = generateOtp();

      await this.authRepository.updateUserResetOtp(
        user,
        resetOtpExpireAt,
        resetOtp
      );
      let link = `http://localhost:5000/api/auth/resetPassword?email=${email}`;

      await mailSender(
        email,
        "Reset Otp",
        `Your reset otp is ${resetOtp}  click the link for reset ${link}`
      );
      auditLogHelper("Reset otp",user.id,ip,"User",user.id)

    } catch (error: any) {
      throw new CustomError(error.message);
    }
  };

  public resetPasswordService = async (
    body: resetPasswordDto,
    email: any,
    ip? : any
  ): Promise<void> => {
    const { resetOtp, newPassword, confirmNewPassword } = body;
    if (newPassword !== confirmNewPassword)
      throw new CustomError("Passwords doesn't match");

    try {
      const user = await this.authRepository.findByEmail(email);
      if (!user) throw new CustomError("User not found", 404);
      const isResetOtpMatch = resetOtp && resetOtp === user.reset_otp;
      if (!isResetOtpMatch) throw new CustomError("Reset otp doesn't match");
      const isResetOtpExpired =
        resetOtp &&
        user?.reset_otp_expire_at !== null &&
        user.reset_otp_expire_at.getTime() < new Date().getTime();
      if (isResetOtpExpired) throw new CustomError("Reset Otp expired");
      const hashedPw = await hashPassword(newPassword);
      auditLogHelper("Password Reset",user.id,ip,"User",user.id)

      await this.authRepository.resetPassword(email, user.password, hashedPw);
    } catch (error: any) {
      throw new CustomError(error.message);
    }
  };
  public logoutService = async(res : Response,userId :number,ip? : any) => {
    res.clearCookie("accessToken",{
      httpOnly : true,
      sameSite : "strict",
      maxAge : 0
    })
    res.clearCookie("refreshToken",{
      httpOnly : true,
      sameSite : "strict",
      maxAge : 0
    })
    auditLogHelper("Register",userId,ip,"User",userId)

  }
}
