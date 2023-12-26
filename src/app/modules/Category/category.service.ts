import { JwtPayload } from "jsonwebtoken";
import { ICategory } from "./category.interface";
import Category from "./category.model";

const createCategoryIntoDB = async (user: JwtPayload, category: ICategory) => {
  const result = await Category.create({ ...category, createdBy: user._id });
  return result;
};

const getAllCategoriesFromDB = async () => {
  const result = await Category.find().populate({
    path: "createdBy",
    select: "-createdAt -updatedAt -__v",
  });
  return result;
};

export { createCategoryIntoDB, getAllCategoriesFromDB };
