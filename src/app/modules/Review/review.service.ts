import { JwtPayload } from "jsonwebtoken";
import { IReview } from "./review.interface";
import Review from "./review.model";

const createReviewIntoDB = async (user: JwtPayload, review: IReview) => {
  const result = (
    await Review.create({ ...review, createdBy: user._id })
  ).populate({
    path: "createdBy",
    select: "-createdAt -updatedAt -__v",
  });
  return result;
};

export { createReviewIntoDB };
