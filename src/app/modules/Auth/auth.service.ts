import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../error/AppError";
import User from "../User/user.model";
import { IJWTPayload, ILoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";

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

export { loginUserService };
