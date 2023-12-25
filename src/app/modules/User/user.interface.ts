/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  role?: "user" | "admin";
}

export interface UserModel extends Model<IUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
