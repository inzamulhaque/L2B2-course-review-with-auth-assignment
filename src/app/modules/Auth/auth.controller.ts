import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { loginUserService } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await loginUserService(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User login successful",
    data: result,
  });
});

export { loginUser };
