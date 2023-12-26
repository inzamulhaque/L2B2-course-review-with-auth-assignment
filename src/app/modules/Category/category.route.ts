import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createCategoryValidationSchema } from "./category.validation";
import { createCategory, getAllCategory } from "./category.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router: Router = Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(createCategoryValidationSchema),
  createCategory,
);

router.get("/", getAllCategory);

export const CategoryRoutes = router;
