import { Router } from "express";
import { loginUser } from "./auth.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router: Router = Router();

router.post("/login", loginUser);

router.post("/change-password", auth(USER_ROLE.admin, USER_ROLE.user));

export const AuthRoutes = router;
