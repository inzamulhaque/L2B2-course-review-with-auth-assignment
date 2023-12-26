import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
import { IOldPassword, IUser, UserModel } from "./user.interface";
import { user_role_array } from "./user.constant";

const userSchema = new Schema<IUser, UserModel>(
  {
    username: {
      type: String,
      required: [true, "UserName is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password address is required"],
      select: 0,
    },
    role: {
      type: String,
      enum: user_role_array,
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

const User = model<IUser, UserModel>("User", userSchema);

// create model for storing old password
const oldPasswordSchema = new Schema<IOldPassword>(
  {
    id: {
      type: Schema.Types.ObjectId,
      required: [true, "ID is required"],
      ref: "User",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      ref: "User",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const OldPassword = model<IOldPassword>(
  "OldPassword",
  oldPasswordSchema,
);

export default User;
