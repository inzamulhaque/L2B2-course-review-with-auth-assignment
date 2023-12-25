import jwt, { JwtPayload } from "jsonwebtoken";
import { IJWTPayload } from "./auth.interface";
import config from "../../config";
import bcrypt from "bcrypt";

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

export const hashPassword = async (pass: string) => {
  return await bcrypt.hash(pass, Number(config.bcrypt_salt_rounds));
};
