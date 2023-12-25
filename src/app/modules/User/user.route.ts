import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createNewUser } from "./user.controller";
import { createUserValidationSchema } from "./user.validation";

const router: Router = Router();

router.post("/", validateRequest(createUserValidationSchema), createNewUser);

export const UserRoutes = router;
