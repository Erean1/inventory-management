import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ACCESS_SECRET, REFRESH_SECRET } from "../config/env.config";
import { CustomError } from "../lib/customError";
import { AuthRepository } from "../modules/auth/auth.repository";

const authRepository = new AuthRepository();
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken || "";
  const refreshToken = req.cookies.refreshToken || "";
  try {
    if (accessToken && accessToken !== "") {
      const decodedData = jwt.verify(accessToken, ACCESS_SECRET!) as JwtPayload;
      req.user = decodedData;
      next();
    } else {
      if (!refreshToken && refreshToken === "")
        throw new CustomError("RefreshToken missing");
      const decodeRefresh = jwt.verify(
        refreshToken,
        REFRESH_SECRET!
      ) as JwtPayload;

      const userDatas = await authRepository.findById(Number(decodeRefresh.id));

      const newUserData = {
        id: userDatas.id,
        username: userDatas.username,
        email: userDatas.email,
        createdAt: userDatas.created_at,
      };

      const newAccessToken = jwt.sign(newUserData, ACCESS_SECRET!, {
        expiresIn: "1h",
      });

      res.cookie("accesToken", newAccessToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      });

      next();
    }
  } catch (error: any) {
    throw new CustomError(error.message);
  }
};
