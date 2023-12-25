/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

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

export type TUserRole = keyof typeof USER_ROLE;

export interface IOldPassword {
  id: Types.ObjectId;
  email: string;
  password: string;
}
