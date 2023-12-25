import { z } from "zod";
import { user_role_array } from "./user.constant";

const createUserValidationSchema = z.object({
  body: z.object({
    username: z.string(),
    email: z.string(),
    password: z
      .string()
      .min(6, { message: "Password can not be less than 8 characters" })
      .max(20, { message: "Password can not be more than 20 characters" })
      .refine(
        (pass) => {
          const hasUpperCase = /[A-Z]/.test(pass);
          const hasLowerCase = /[a-z]/.test(pass);
          const hasNumber = /[0-9]/.test(pass);

          return hasUpperCase && hasLowerCase && hasNumber;
        },
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, and one number",
        },
      ),
    role: z.enum([...user_role_array] as [string, ...string[]]).optional(),
  }),
});

export { createUserValidationSchema };
