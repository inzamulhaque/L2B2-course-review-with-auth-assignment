import { Types } from "mongoose";

export interface ILoginUser {
  username: string;
  password: string;
}

export interface IJWTPayload {
  _id: Types.ObjectId;
  role: string;
  email: string;
}

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
}
