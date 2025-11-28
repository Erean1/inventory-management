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
import { CustomError } from "../../lib/customError";
import { AuthRepository } from "./auth.repository";
export class AuthService {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  public async registerUserService(body: RegisterUserDto) {
    try {
      const { email, password, username } = body;
      const isExists = await this.authRepository.findByEmail(email);
      if (isExists) {
        throw new CustomError("existing user");
      }
      let verifyOtp = await generateOtp();
      const user = await this.authRepository.createUser(body, verifyOtp);
      let link = `http://localhost:5000/api/auth/verify?email=${email}&verifyOtp=${verifyOtp}`;
      await mailSender(
        email,
        "VERIFY OTP",
        `Your Otp CODE is ${verifyOtp} click To link and verify your account ${link}`
      );
      user.verify_otp = verifyOtp;
      return user;
    } catch (error: any) {
      throw new CustomError(error.message);
    }
  }

  public loginUserService = async (body: any) => {
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
      return user;
    } catch (error: any) {
      throw new CustomError(error.message);
    }
  };

  public verifyUserService = async (body: verifyUserDto) => {
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

      user.verify_otp = "";
      user.verify_otp_expire_at = null;
      await this.authRepository.updateUserVerified(user);
    } catch (error: any) {
      throw new CustomError(error.message);
    }
  };

  public sendResetOtpService = async (email: string): Promise<void> => {
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
    } catch (error: any) {
      throw new CustomError(error.message);
    }
  };

  public resetPasswordService = async (
    body: resetPasswordDto,
    email: any
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
      await this.authRepository.resetPassword(email, user.password, hashedPw);
    } catch (error: any) {
      throw new CustomError(error.message);
    }
  };
  public logoutService = (res : Response) => {
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
  }
}
