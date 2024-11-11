import validator from "validator";
import { z } from "zod";

export const companyFormSchema = z
  .object({
    companyName: z
      .string()
      .trim()
      .min(1, { message: "This field shouldn't be empty!" }),
    entityType: z.string(),
    entitySize: z.string(),
    address: z.string(),
    bankAccount: z.string(),
    taxIndentification: z.string(),
  })
  .refine(
    (data) => {
      const regex = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
      return !regex.test(data.companyName);
    },
    {
      message: "Special characters not allowed!",
      path: ["companyName"],
    },
  )
  .refine((data) => validator.isIBAN(data.bankAccount), {
    message: "Bank Account Number not valid!",
    path: ["bankAccount"],
  })
  .refine((data) => validator.isTaxID(data.taxIndentification), {
    message: "Tax Indentification Number not valid!",
    path: ["taxIndentification"],
  });
