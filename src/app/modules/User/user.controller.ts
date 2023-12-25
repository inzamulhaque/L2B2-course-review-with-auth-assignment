import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createUserIntoDB } from "./user.service";

const createNewUser = catchAsync(async (req, res) => {
  // create user into DB
  const result = await createUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: result,
  });
});

export { createNewUser };
