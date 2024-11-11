import React from "react";
import { Input, InputProps } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FormProps } from "./auctionForm";

const MoneyInput = React.forwardRef<HTMLInputElement, FormProps>(
  ({ form, ...props }, ref) => {
    return (
      <div className="relative h-10">
        <FormField
          control={form.control}
          name="startingPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Price</FormLabel>
              <FormControl>
                <Input type="string" placeholder="$ 5" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="absolute right-0 top-1/2 h-10 translate-x-1 translate-y-1/3">
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="USD" />
                    </SelectTrigger>
                    <SelectContent {...props}>
                      <SelectGroup>
                        <SelectLabel>Currency</SelectLabel>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="RON">RON</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    );
  },
);

export { MoneyInput };
