import { NextFunction, Request, Response } from "express";
import { ResponseHandler } from "../lib/response";

const responseHandler = new ResponseHandler();

const roleGuardMiddleware = (allowedPermissions: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user.role;
    let isAccess;
    for (let permission of allowedPermissions) {
      isAccess = permission.startsWith(userRole);
      if (isAccess) break;
    }
    if (!isAccess)
      return responseHandler.errorResponse(res, "ACCESS DENIED", 403);
    next();
  };
};
