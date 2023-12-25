import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: "UserName is required." }),
    password: z.string({ required_error: "Password is required" }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    currentPassword: z.string(),
    newPassword: z
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
  }),
});

export { loginValidationSchema, changePasswordValidationSchema };
