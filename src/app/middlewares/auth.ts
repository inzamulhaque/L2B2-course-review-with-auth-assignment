import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { verifyToken } from "../modules/Auth/auth.utils";
import { TUserRole } from "../modules/User/user.interface";
import User from "../modules/User/user.model";
import JWTError from "../error/JWTErrors";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new JWTError();
    }

    // checking if the given token is valid
    const decoded = verifyToken(token, config.jwt_access_secret as string);

    const { _id, role } = decoded;

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new JWTError();
    }

    // checking if the user is exist
    const user = await User.findById(_id);

    if (!user) {
      throw new JWTError();
    }
    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
