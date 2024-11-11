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
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import BackToLoginLink from "../common/BackToLoginLink";
import MessageBox from "./MessageBox";

const formSchema = z.object({
  email: z.string().trim().email({
    message: "Invalid email address!",
  }),
});

type Props = {
  isRecoveryLinkSent: boolean;
  sendRecoveryLink: (email: string) => void;
};

export default function ForgotPasswordForm({
  isRecoveryLinkSent,
  sendRecoveryLink,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "chrisdev2002@gmail.com",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    sendRecoveryLink(values.email);
  }

  return isRecoveryLinkSent ? (
    <MessageBox
      sendRecoveryLink={() => sendRecoveryLink(form.getValues("email"))}
    />
  ) : (
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
                <Input placeholder="Ex: olivia@untitledui.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-primary text-white">
          Send reset link
        </Button>

        <BackToLoginLink />
      </form>
    </Form>
  );
}
