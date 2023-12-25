import { Router } from "express";
import { UserRoutes } from "../app/modules/User/user.route";
import { AuthRoutes } from "../app/modules/Auth/auth.route";

const router: Router = Router();

const authRouters = [
  {
    path: "/register",
    route: UserRoutes,
  },
  {
    path: "/",
    route: AuthRoutes,
  },
];

authRouters.forEach((route) => router.use(route.path, route.route));

export default router;
