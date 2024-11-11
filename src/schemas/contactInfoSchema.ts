import { z } from "zod";

export const ContactFormSchema = z.object({
  firstName: z.string().min(1, {
    message: "First Name must be at least one character.",
  }),
  lastName: z.string().min(1, {
    message: "Last Name must be at least one character.",
  }),
  email: z.string().min(1, {
    message: "Email adress must be at least one character.",
  }),
});

export type ContactInfoSchemaType = z.infer<typeof ContactFormSchema>;
