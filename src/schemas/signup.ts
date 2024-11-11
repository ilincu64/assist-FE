import * as z from "zod";
import validator from "validator";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/,
);

export const SignupFormSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "Please enter a valid First Name!",
    }),
    lastName: z.string().min(2, {
      message: "Please enter a valid Last Name!",
    }),
    email: z.string().email({
      message: "Please enter a valid email address!",
    }),
    password: z
      .string()
      .min(8)
      .regex(new RegExp(".*[A-Z].*"), {
        message: "Password must contain at least one uppercase letter!",
      })
      .regex(new RegExp(".*[a-z].*"))
      .regex(new RegExp(".*[0-9].*"), {
        message: "Password must contain at least one number!",
      })
      .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), {
        message: "Password must contain at least one special character!",
      }),
    confirmPassword: z.string().trim().regex(passwordValidation, {
      message: "Your password is not valid",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords dont't match!",
    path: ["confirmPassword"],
  });

export const SecondStepSignupSchema = z
  .object({
    companyName: z.string().min(2, {
      message: "Please enter a valid Company Name!",
    }),
    entityType: z.string().min(2, {
      message: "Please enter a valid Entity Type!",
    }),
    entitySize: z.string().min(2, {
      message: "Please enter a valid Entity Size!",
    }),
    address: z.string().min(2, {
      message: "Please enter a valid Address!",
    }),
    bankAccount: z.string().min(13, {
      message: "Please enter a valid Bank Account!",
    }),
    cif: z.string().min(8).regex(new RegExp(".*RO.*"), {
      message: "CIF format not recognized try RO123*****",
    }).regex(new RegExp(".*[0-9].*"), {
      message: "CIF format not recognized try RO123*****",
      
    })
  
  }).refine((data) => validator.isIBAN(data.bankAccount), {
    message: "Bank Account Number not valid!",
    path: ["bankAccount"],
  })
  
  
