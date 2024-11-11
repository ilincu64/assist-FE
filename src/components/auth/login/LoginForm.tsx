import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import UserUtilities from "./UserUtilities";
import HidePassButton from "../common/HidePassButton";
import SignupLoginSwitch from "../../SignupLoginSwitch";

import { passwordSchema } from "../../../schemas/passwordSchema";
import { addRemoveLocalSToken } from "../../../utils/addRemoveLocalSToken";
import { useTokenStore } from "../../../store/tokenStore";
import { AuthApi } from "../../../api/AuthApi";
import toast from "react-hot-toast";
import { addSessionSToken } from "../../../utils/addSessionSToken";

const formSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address!" }),
  password: passwordSchema,
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isRemembered, setIsRemembered] = useState<boolean>(false);
  const [isPassHidden, setIsPassHidden] = useState<boolean>(true);

  const token = useTokenStore((state) => state.token);
  const isLoadingToken = useTokenStore((state) => state.isLoadingToken);
  const loadingToken = useTokenStore((state) => state.loadingToken);
  const loadToken = useTokenStore((state) => state.loadToken);
  const loadErrorToken = useTokenStore((state) => state.loadErrorToken);

  function onSubmit(values: z.infer<typeof formSchema>) {
    loadingToken();
    AuthApi.login(values)
      .then((res) => {
        loadToken(res.access_token);
        isRemembered
          ? addRemoveLocalSToken(isRemembered, res.access_token)
          : addSessionSToken(res.access_token);
      })
      .catch((err) => {
        loadErrorToken(err.response.data);
        toast.error(err.response.data);
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-sm font-normal text-textGray">
                Email address
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Ex: olivia@untitledui.com"
                  {...field}
                  disabled={isLoadingToken}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                    type={isPassHidden ? "password" : "text"}
                    placeholder="Enter password"
                    {...field}
                    disabled={isLoadingToken}
                  />
                  <HidePassButton
                    isLoading={isLoadingToken}
                    isPassHidden={isPassHidden}
                    onClick={() => {
                      setIsPassHidden((prev) => !prev);
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <UserUtilities
          isLoading={isLoadingToken}
          onCheckedChange={(checked) => {
            setIsRemembered(checked);
            !checked && addRemoveLocalSToken(checked, token);
          }}
        />

        <Button
          type="submit"
          disabled={isLoadingToken}
          className="w-full bg-primary text-white"
        >
          Login
        </Button>

        <div className="mt-auto">
          <SignupLoginSwitch page="login" />
        </div>
      </form>
    </Form>
  );
}
