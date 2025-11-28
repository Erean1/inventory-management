import bcrpyt from "bcryptjs";
import { transporter } from "../../config/transporter";
import jwt from "jsonwebtoken"
import { ACCESS_SECRET, REFRESH_SECRET } from "../../config/env.config";
import { Response } from "express";
import { User } from "../../generated/prisma";
export const hashPassword = (password: string): Promise<string> => {
  const hashedPassword = bcrpyt.hash(password, 10);
  return hashedPassword;
};

export const mailSender = async (
  to: string,
  subject: string,
  text : string
) => {
  await transporter.sendMail({
    from : "INVENTORY SAAS TEAM",
    to,
    subject,
    text
  });
};
export const generateOtp = () => {
    return String(Math.floor(100000 + Math.random() * 900000))
};
export const cookieHandler = (res : Response,user : User) => {
  const accessPayload = {
    id : user.id,
    username : user.username,
    email : user.email,
    createdAt : user.created_at
  }
  const refreshPayload = {
    id : user.id
  }

  const accessToken = jwt.sign(accessPayload,ACCESS_SECRET as string,{expiresIn:"1h"});
  const refreshToken = jwt.sign(refreshPayload,REFRESH_SECRET as string,{expiresIn:"1d"});

  res.cookie("accessToken",accessToken,{
    httpOnly: true,
    sameSite : "strict",
    maxAge : 1000 * 60 * 60
  })
  res.cookie("refreshToken",refreshToken,{
    httpOnly : true,
    sameSite : "strict",
    maxAge : 1000 * 60 * 60 * 24 
  })
}

export const expireDateHandlerBasedMinutes = (minute : number) => {
  return new Date(Date.now() + (1000 * 60 * minute))
}
export const hashComparer = (passwordToCompare : string,password : string) => {
  return bcrpyt.compare(password,passwordToCompare)
}