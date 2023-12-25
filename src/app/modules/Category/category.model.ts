import { Schema, model } from "mongoose";
import { ICategory } from "./category.interface";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Category name is required"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const Category = model<ICategory>("Category", categorySchema);

export default Category;
