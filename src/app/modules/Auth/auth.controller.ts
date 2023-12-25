import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { changePasswordIntoDB, loginUserService } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await loginUserService(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User login successful",
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const result = await changePasswordIntoDB(req.user, req.body);

  if (result?.passwordValidationError) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${result?.time}`,
      data: null,
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Password changed successfully",
      data: result,
    });
  }
});

export { loginUser, changePassword };
