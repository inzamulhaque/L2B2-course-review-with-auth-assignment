import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createCategoryValidationSchema } from "./category.validation";
import { createCategory, getAllCategory } from "./category.controller";

const router: Router = Router();

router.post(
  "/",
  validateRequest(createCategoryValidationSchema),
  createCategory,
);

router.get("/", getAllCategory);

export const CategoryRoutes = router;
