import { Router } from "express";
import { changePassword, loginUser } from "./auth.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import {
  changePasswordValidationSchema,
  loginValidationSchema,
} from "./auth.validation";

const router: Router = Router();

router.post("/login", validateRequest(loginValidationSchema), loginUser);

router.post(
  "/change-password",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(changePasswordValidationSchema),
  changePassword,
);

export const AuthRoutes = router;
