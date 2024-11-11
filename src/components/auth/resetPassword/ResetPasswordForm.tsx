import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Button } from "../../ui/button";
import BackToLoginLink from "../common/BackToLoginLink";
import { Input } from "../../ui/input";
import HidePassButton from "../common/HidePassButton";
import { passwordSchema } from "../../../schemas/passwordSchema";

const formSchema = z
  .object({
    password: passwordSchema,
    repeatPassword: passwordSchema,
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords dont't match!",
    path: ["repeatPassword"],
  });

export default function ResetPasswordForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      repeatPassword: "",
    },
  });
  const [isPassHidden, setIsPassHidden] = useState<{
    password: boolean;
    repeatPassword: boolean;
  }>({
    password: true,
    repeatPassword: true,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-sm font-normal text-textGray">
                Password
              </FormLabel>

              <FormControl>
                <div className="relative flex">
                  <Input
                    type={isPassHidden.password ? "password" : "text"}
                    placeholder="Enter password"
                    {...field}
                  />
                  <HidePassButton
                    isLoading={false}
                    isPassHidden={isPassHidden.password}
                    onClick={() => {
                      setIsPassHidden((prev) => ({
                        ...prev,
                        password: !prev.password,
                      }));
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="repeatPassword"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-sm font-normal text-textGray">
                Repeat password
              </FormLabel>

              <FormControl>
                <div className="relative flex">
                  <Input
                    type={isPassHidden.repeatPassword ? "password" : "text"}
                    placeholder="Enter password"
                    {...field}
                  />
                  <HidePassButton
                    isLoading={false}
                    isPassHidden={isPassHidden.repeatPassword}
                    onClick={() => {
                      setIsPassHidden((prev) => ({
                        ...prev,
                        repeatPassword: !prev.repeatPassword,
                      }));
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-primary text-white">
          Confirm and Login
        </Button>

        <BackToLoginLink />
      </form>
    </Form>
  );
}
