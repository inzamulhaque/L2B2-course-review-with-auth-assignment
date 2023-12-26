import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createReviewIntoDB } from "./review.service";

const createReview = catchAsync(async (req, res) => {
  // create review into DB
  const result = await createReviewIntoDB(req.user, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Review created successfully",
    data: result,
  });
});

export { createReview };
