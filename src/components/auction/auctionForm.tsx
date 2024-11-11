import React from "react";
import { UseFormReturn } from "react-hook-form";
import { MoneyInput } from "./moneyInput";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { CreateAuctionSchemaType } from "../../schemas/createAuctionSchema";

export interface FormProps {
  form: UseFormReturn<CreateAuctionSchemaType>;
}

export const AuctionForm: React.FC<FormProps> = ({ form }) => {
  return (
    <>
      <div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Auction Title</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-flow-row grid-cols-2 gap-6">
          <MoneyInput form={form} />

          <FormField
            control={form.control}
            name="thresholdPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Threshold Price</FormLabel>
                <FormControl>
                  <Input type="string" placeholder="$ 500" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-flow-row grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    placeholder="placeholder"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    placeholder="placeholder"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </>
  );
};
