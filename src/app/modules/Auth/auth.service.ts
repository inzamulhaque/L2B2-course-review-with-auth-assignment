import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../error/AppError";
import User, { OldPassword } from "../User/user.model";
import { IChangePassword, IJWTPayload, ILoginUser } from "./auth.interface";
import { createToken, hashPassword } from "./auth.utils";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

const loginUserService = async (payload: ILoginUser) => {
  // checking if the user is exist
  const user = await User.findOne(
    { username: payload.username },
    { _id: 1, username: 1, email: 1, role: 1, password: 1 },
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  //checking if the password is correct
  const isPasswordMatched = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");
  }

  const jwtPayload: IJWTPayload = {
    _id: user?._id,
    role: user?.role as string,
    email: user?.email,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { password, ...restUser } = user.toObject();

  return { user: restUser, token };
};

const changePasswordIntoDB = async (
  userData: JwtPayload,
  payload: IChangePassword,
) => {
  // find user from DB
  const user = await User.findById(userData._id).select("+password");

  // check user exists or not
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  // check the currentPassword
  const isPasswordMatched = await User.isPasswordMatched(
    payload?.currentPassword,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");
  }

  // check the new password and current password are some or not
  const isCurrentPasswordMatched = await User.isPasswordMatched(
    payload?.newPassword,
    user?.password,
  );

  if (isCurrentPasswordMatched) {
    const time = (user.createdAt as string) ?? "2023-01-01 at 12:00 PM";
    return { passwordValidationError: true, time };
  }

  const findOldPasswordData = await OldPassword.find(
    { id: user._id, email: user.email },
    { password: 1, _id: 0, createdAt: 1 },
  )
    .sort({ createdAt: -1 })
    .limit(2);

  if (findOldPasswordData && findOldPasswordData.length > 0) {
    // check any of the last 2 old password are match or not
    for (const passObj of findOldPasswordData) {
      const isOldPasswordMatched = await User.isPasswordMatched(
        payload?.newPassword,
        passObj?.password,
      );

      if (isOldPasswordMatched) {
        return { passwordValidationError: true, time: passObj.createdAt };
      }
    }
  }

  const findAllOldPasswordForSingleUser = await OldPassword.find({
    id: user._id,
    email: user.email,
  });

  const countOldPasswordForSingleUser = await OldPassword.countDocuments(
    findAllOldPasswordForSingleUser,
  );

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // if the user already has two old passwords, delete one
    if (countOldPasswordForSingleUser >= 2) {
      //   await OldPassword.findOneAndDelete(
      //     { id: user._id, email: user.email },
      //     { sort: { createdAt: 1 } },
      //     { session },
      //   );

      const oldestPassword = await OldPassword.findOne(
        { id: user._id, email: user.email },
        null,
        { sort: { createdAt: 1 }, session },
      );

      if (oldestPassword) {
        await oldestPassword.deleteOne({ session });
      }
    }

    await OldPassword.create(
      [
        {
          id: user._id,
          email: user.email,
          password: user.password,
        },
      ],
      { session },
    );

    const hashPass = await hashPassword(payload.newPassword);

    const result = await User.findByIdAndUpdate(
      user._id,
      { password: hashPass },
      { new: true, runValidators: true, session },
    ).select("-__v");

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    console.log(err);
  }
};

export { loginUserService, changePasswordIntoDB };
