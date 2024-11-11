import { z } from "zod";
import { passwordSchema } from "./passwordSchema";

export const profileFormSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, { message: "This field shouldn't be empty!" }),
    lastName: z
      .string()
      .trim()
      .min(1, { message: "This field shouldn't be empty!" }),
    email: z.string().trim().email({ message: "Invalid email address!" }),
    password: passwordSchema,
    repeatPassword: passwordSchema,
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords dont't match!",
    path: ["repeatPassword"],
  })
  .refine(
    (data) => {
      const regex = /\d/;
      return !regex.test(data.firstName);
    },
    { message: "Numbers not allowed!", path: ["firstName"] },
  )
  .refine(
    (data) => {
      const regex = /\d/;
      return !regex.test(data.lastName);
    },
    { message: "Numbers not allowed!", path: ["lastName"] },
  )
  .refine(
    (data) => {
      const regex = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
      return !regex.test(data.firstName);
    },
    { message: "Special characters not allowed!", path: ["firstName"] },
  )
  .refine(
    (data) => {
      const regex = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
      return !regex.test(data.lastName);
    },
    { message: "Special characters not allowed!", path: ["lastName"] },
  );
