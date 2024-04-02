import { z } from "zod";

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const emailSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
});

export const pinSchema = z.object({
  pin: z.string().min(6, { message: "Pin must be at least 6 characters" }),
});

export const confirmPasswordSchema = z
  .object({
    password: z.string().regex(passwordRegex, {
      message: "Please enter valid password",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type EmailField = z.infer<typeof emailSchema>;
export type PinField = z.infer<typeof pinSchema>;
export type ConfirmPasswordField = z.infer<typeof confirmPasswordSchema>;
