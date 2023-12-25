import { IUser } from "./user.interface";
import User from "./user.model";

const createUserIntoDB = async (payload: IUser) => {
  const createUser = await User.create(payload);
  const id = createUser?._id;
  const result = await User.findById(id, { password: 0, __v: 0 });
  return result;
};
export { createUserIntoDB };
