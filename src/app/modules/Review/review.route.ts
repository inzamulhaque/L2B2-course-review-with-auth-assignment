import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createReviewValidationSchema } from "./review.validation";
import { createReview } from "./review.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router: Router = Router();

router.post(
  "/",
  auth(USER_ROLE.user),
  validateRequest(createReviewValidationSchema),
  createReview,
);

export const ReviewRoutes = router;
