import { z } from "zod";
import { ContactFormSchema } from "./contactInfoSchema";

export const CreateAuctionSchema = ContactFormSchema.extend({
  currency: z.string().optional(),
  title: z.string().min(1, {
    message: "Auction title must be at least one character.",
  }),
  startingPrice: z.string().refine(
    (val) => {
      const number = parseFloat(val);
      return number > 0;
    },
    {
      message: "Start price must be a positive number.",
    },
  ),
  thresholdPrice: z.string(),
  startTime: z.string().refine(
    (val) => {
      const date = new Date(val);
      return date > new Date();
    },
    {
      message: "Start time must be from now on.",
    },
  ),
  endTime: z.string(),
})
  .refine(
    (data) => {
      const startPrice = parseFloat(data.startingPrice);
      const thresholdPrice = parseFloat(data.thresholdPrice);
      console.log(startPrice, thresholdPrice);
      return thresholdPrice > startPrice;
    },
    {
      message: "Threshold price must be greater than start price.",
      path: ["thresholdPrice"],
    },
  )
  .refine(
    (data) => {
      const startTime = new Date(data.startTime);
      const endTime = new Date(data.endTime);
      return endTime > startTime;
    },
    {
      message: "End time must be later than start time.",
      path: ["endTime"],
    },
  );

export type CreateAuctionSchemaType = z.infer<typeof CreateAuctionSchema>;
