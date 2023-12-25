import { Schema, model } from "mongoose";
import { IReview } from "./review.interface";

const reviewSchema = new Schema<IReview>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      required: [true, "Course ID is required"],
      ref: "Course",
    },
    rating: {
      type: Number,
      min: [1, "Minimum rating value is 1"],
      max: [5, "Maximum rating value is 5"],
      required: [true, "Course rating is required"],
    },
    review: {
      type: String,
      required: [true, "Course review is required"],
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

const Review = model<IReview>("Review", reviewSchema);

export default Review;
