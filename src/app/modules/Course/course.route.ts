import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createCourseValidationSchema } from "./course.validation";
import {
  createCourse,
  getAllCourse,
  getBestRatedCourse,
  getCourseByIDWithReviews,
  updateCourse,
} from "./course.controller";
import { updateCategoryValidationSchema } from "../Category/category.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router: Router = Router();

router.post(
  "/course",
  auth(USER_ROLE.admin),
  validateRequest(createCourseValidationSchema),
  createCourse,
);

router.put(
  "/courses/:courseId",
  validateRequest(updateCategoryValidationSchema),
  updateCourse,
);

router.get("/courses/:courseId/reviews", getCourseByIDWithReviews);

router.get("/course/best", getBestRatedCourse);

router.get("/courses", getAllCourse);

export const CourseRoute = router;
