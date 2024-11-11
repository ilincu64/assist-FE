import { cva } from "class-variance-authority";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import HidePassButton from "../auth/common/HidePassButton";
import FormOperations from "./FormOperations";
import Section from "./Section";
import SectionInfo from "./SectionInfo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";
import { HiMiniCloudArrowUp } from "react-icons/hi2";

import { profileFormSchema } from "../../schemas/profileUserForm";
import useSWR from "swr";
import { AuthApi } from "../../api/AuthApi";
import { UserResponse } from "../../types";

const inputForm = cva("div", {
  variants: {
    intent: {
      full: [
        "sm:row-start-2",
        "sm:row-end-3",
        "sm:col-start-1",
        "sm:col-end-3",
      ],
    },
  },
});

const inputs = [
  {
    label: "First name",
    name: "firstName",
    placeholder: "Ex: Petronescu",
    type: "text",
    size: "half",
  },
  {
    label: "Last name",
    name: "lastName",
    placeholder: "Ex: Marcel",
    type: "text",
    size: "half",
  },
  {
    label: "Email address",
    name: "email",
    placeholder: "Ex: olivia@untitledui.com",
    type: "text",
    size: "full",
  },
  {
    label: "Password",
    name: "password",
    placeholder: "Enter password",
    type: "password",
    size: "half",
  },
  {
    label: "Repeat password",
    name: "repeatPassword",
    placeholder: "Reenter password",
    type: "password",
    size: "half",
  },
] as const;

type Props = {
  user: UserResponse;
};

export default function ProfileSection({ user }: Props) {
  // const { data, isLoading, error } = useSWR("/users", AuthApi.getUser);
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: user ? user.firstName : "",
      lastName: user ? user.lastName : "",
      email: user ? user.email : "",
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

  function onSubmit(values: z.infer<typeof profileFormSchema>) {
    console.log(values);
  }

  return (
    <Section>
      <SectionInfo
        title="Personal info"
        description="Update your photo and personal details."
      />

      <div className="rounded-lg border">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full grid-cols-1 grid-rows-5 gap-6 p-6 sm:grid-cols-2 sm:grid-rows-3">
              {inputs.map((input) => (
                <div
                  key={input.name}
                  className={inputForm({
                    intent: input.size === "full" ? "full" : undefined,
                  })}
                >
                  <FormField
                    control={form.control}
                    name={input.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-normal">
                          {input.label}
                        </FormLabel>
                        <FormControl>
                          {input.type === "password" ? (
                            <div className="relative flex">
                              <Input
                                type={
                                  input.name === "password"
                                    ? isPassHidden.password
                                      ? "password"
                                      : "text"
                                    : isPassHidden.repeatPassword
                                      ? "password"
                                      : "text"
                                }
                                placeholder="Enter password"
                                {...field}
                              />
                              <HidePassButton
                                isLoading={false}
                                isPassHidden={
                                  (input.name === "password" &&
                                    isPassHidden.password) ||
                                  (input.name === "repeatPassword" &&
                                    isPassHidden.repeatPassword)
                                }
                                onClick={() => {
                                  input.name === "password"
                                    ? setIsPassHidden((prev) => ({
                                        ...prev,
                                        password: !prev.password,
                                      }))
                                    : setIsPassHidden((prev) => ({
                                        ...prev,
                                        repeatPassword: !prev.repeatPassword,
                                      }));
                                }}
                              />
                            </div>
                          ) : (
                            <Input placeholder={input.placeholder} {...field} />
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>

            <div className="mb-6 flex flex-col items-center gap-6 px-6 sm:flex-row sm:items-start">
              <Avatar>
                {user && <AvatarImage src={user?.url} alt="@shadcn" />}
                <AvatarFallback />
              </Avatar>

              <div className="w-full cursor-pointer rounded border p-4">
                <Label
                  htmlFor="picture"
                  className="flex cursor-pointer flex-col items-center justify-center text-sm font-normal"
                >
                  <div className="mb-2 w-min rounded-full border-8 border-gray-100 bg-gray-200 p-1 text-2xl">
                    <HiMiniCloudArrowUp />
                  </div>
                  <p className="text-center sm:text-left">
                    <span className="font-medium">Click to upload</span> or drag
                    and drop
                  </p>
                  <p className="text-center sm:text-left">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </p>
                </Label>
                <Input
                  id="picture"
                  type="file"
                  accept="image/png, image/jpeg image/svg+xml image/gif"
                  className="hidden"
                />
              </div>
            </div>

            <FormOperations
              isChanged={!form.formState.isDirty}
              onClose={() => form.formState.isDirty && form.reset()}
            />
          </form>
        </Form>
      </div>
    </Section>
  );
}
