import jwt, { JwtPayload } from "jsonwebtoken";
import { IJWTPayload } from "./auth.interface";

export const createToken = (
  jwtPayload: IJWTPayload,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
