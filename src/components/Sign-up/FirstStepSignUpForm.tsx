import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
import { SignupFormSchema } from "../../schemas/signup";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useNavigate } from "react-router";
import { getLocalStorageItem } from "../../utils/getLocalStorageItem";

import SignupLoginSwitch from "../SignupLoginSwitch";

const FirstStepSignUpForm = () => {
  const navigate = useNavigate();
  const [passViz, setPassViz] = useState<boolean>(false);
  const [confPassViz, setConfPassViz] = useState<boolean>(false);

  const savedLocalData = getLocalStorageItem("signupLocalStorageData");

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      firstName: savedLocalData?.firstName || "",
      lastName: savedLocalData?.lastName || "",
      email: savedLocalData?.email || "",
      password: savedLocalData?.password || "",
      confirmPassword: savedLocalData?.confirmPassword || "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignupFormSchema>) => {
    if (values.password !== values.confirmPassword) {
      return;
    }

    localStorage.setItem("signupLocalStorageData", JSON.stringify(values));
    navigate("/auth/signup/step2");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Petronescu" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Marcel" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Petronescu" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Enter password"
                    type={passViz ? "text" : "password"}
                    {...field}
                  />
                  {!passViz ? (
                    <MdOutlineRemoveRedEye
                      size={30}
                      color="gray"
                      className="absolute right-0 top-2 pr-2 hover:cursor-pointer"
                      onClick={() => setPassViz(!passViz)}
                    />
                  ) : (
                    <IoEyeOffOutline
                      size={30}
                      color="gray"
                      className="absolute right-0 top-2 pr-2 hover:cursor-pointer"
                      onClick={() => setPassViz(!passViz)}
                    />
                  )}
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repeat Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Reenter Password"
                    type={confPassViz ? "text" : "password"}
                    {...field}
                  />
                  {confPassViz ? (
                    <IoEyeOffOutline
                      size={30}
                      color="gray"
                      className="absolute right-0 top-2 pr-2"
                      onClick={() => setConfPassViz(!confPassViz)}
                    />
                  ) : (
                    <MdOutlineRemoveRedEye
                      size={30}
                      color="gray"
                      className="absolute right-0 top-2 pr-2"
                      onClick={() => setConfPassViz(!confPassViz)}
                    />
                  )}
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full text-white" type="submit">
          Continue
        </Button>

        <div className="mt-auto">
          <SignupLoginSwitch page="signup" />
        </div>
      </form>
    </Form>
  );
};

export default FirstStepSignUpForm;
