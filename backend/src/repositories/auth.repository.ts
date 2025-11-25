import { prisma } from "../lib/prisma";
import { User } from "@prisma/client";
import { RegisterUserDto, resetPasswordDto } from "../dto/auth.dto";
import { expireDateHandlerBasedMinutes, hashPassword } from "../helpers/auth.helpers";
import { CustomError } from "../lib/customError";
export class AuthRepository {
  public async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      return user;
    } catch (error: any) {
      throw new CustomError(error.message);
    }
  }
  public async findByUsername(username: string): Promise<User | null> {
    try {
      const user = await prisma.user.findFirst({
        where: {
          username,
        },
      });
      return user;
    } catch (error: any) {
      throw new CustomError(error.message);
    }
  }
  public async createUser(body: RegisterUserDto,verifyOtp : string): Promise<User> {
    let { username, password, email } = body;
    const hashedPw = await hashPassword(password);
    try {
      const veriyOtpExpireAt = expireDateHandlerBasedMinutes(30)
      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPw,
          email,
          verify_otp : verifyOtp,
          verify_otp_expire_at : veriyOtpExpireAt
        },
      });

      return user;
    } catch (error: any) {
      throw new CustomError(error.stack);
    }          
  }
  public async updateUserVerified (user : User) : Promise<void> {
    const {email,is_verified,verify_otp} = user
    try{ 
      await prisma.user.update({
        where : {
          email
        },
        data : {
          is_verified  : true,
          verify_otp : ""
        }
      });
      return
    } catch(error : any){
      throw new CustomError(error.message)
    }
  }
  public async updateUserResetOtp (user : User,resetOtpExpireAt : Date,resetOtp : string) : Promise<void>{
      try {
        await prisma.user.update({
          where : {
            email : user.email
          },
          data : {
            reset_otp : resetOtp,
            reset_otp_expire_at : resetOtpExpireAt
          }
        })
      } catch(error : any){
        throw new CustomError(error.message)
      }
  }
    public async resetPassword(email : string,password : string,hashedPw : string) : Promise<void>{
    try {
      await prisma.user.update({
        where : {
          email
        },
        data : {
          password : hashedPw
        }
      })
    } catch(error :any){
      throw new CustomError(error.message)
    }
  }
}
