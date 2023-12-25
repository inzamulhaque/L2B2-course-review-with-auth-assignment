import { Router } from "express";
import { UserRoutes } from "../app/modules/User/user.route";

const router: Router = Router();

const authRouters = [
  {
    path: "/register",
    route: UserRoutes,
  },
];

authRouters.forEach((route) => router.use(route.path, route.route));

export default router;
