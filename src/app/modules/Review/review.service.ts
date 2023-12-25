import { IReview } from "./review.interface";
import Review from "./review.model";

const createReviewIntoDB = async (review: IReview) => {
  const result = await Review.create(review);
  return result;
};

export { createReviewIntoDB };
