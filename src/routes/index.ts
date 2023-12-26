import { Router } from "express";
import { CategoryRoutes } from "../app/modules/Category/category.route";
import { CourseRoute } from "../app/modules/Course/course.route";
import { ReviewRoutes } from "../app/modules/Review/review.route";
import { UserRoutes } from "../app/modules/User/user.route";
import { AuthRoutes } from "../app/modules/Auth/auth.route";

const router: Router = Router();

const moduleRouters = [
  {
    path: "/categories",
    route: CategoryRoutes,
  },
  {
    path: "/",
    route: CourseRoute,
  },
  {
    path: "/reviews",
    route: ReviewRoutes,
  },
  {
    path: "/auth/register",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;
