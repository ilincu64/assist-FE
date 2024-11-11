import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cva } from "class-variance-authority";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import Section from "./Section";
import { Input } from "../ui/input";
import FormOperations from "./FormOperations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import SectionInfo from "./SectionInfo";

import { companyFormSchema } from "../../schemas/profileCompanyForm";
import { AuthApi } from "../../api/AuthApi";
import useSWR from "swr";
import { UserResponse } from "../../types";

const inputForm = cva("div", {
  variants: {
    intent: {
      full: ["sm:col-start-1", "sm:col-end-3"],
    },
  },
});

const inputs = [
  {
    label: "Company name",
    name: "companyName",
    placeholder: "Ex: CompanySRL",
    type: "text",
    size: "full",
  },
  {
    label: "Entity type",
    name: "entityType",
    type: "drop",
    size: "half",
    defaultValue: "srl",
    options: [
      {
        value: "srl",
        content: "SRL",
      },
      {
        value: "sa",
        content: "SA",
      },
      {
        value: "snc",
        content: "SNC",
      },
    ],
  },
  {
    label: "Entity size",
    name: "entitySize",
    type: "drop",
    size: "half",
    defaultValue: "small",
    options: [
      {
        value: "small",
        content: "SMALL",
      },
      {
        value: "medium",
        content: "MEDIUM",
      },
      {
        value: "big",
        content: "BIG",
      },
    ],
  },
  {
    label: "Company address",
    name: "address",
    placeholder: "City, street name, street number",
    type: "text",
    size: "full",
  },
  {
    label: "Bank account number",
    name: "bankAccount",
    placeholder: "Ex: ING1234345678",
    type: "text",
    size: "full",
  },
  {
    label: "Tax Identification Number",
    name: "taxIndentification",
    placeholder: "123456789C",
    type: "text",
    size: "full",
  },
] as const;

type Props = {
  user: UserResponse;
};

export default function CompanySection({ user }: Props) {
  const form = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      companyName: user ? user.companyName : "",
      entityType: user ? user.entityType : "",
      entitySize: user ? user.entitySize : "",
      address: user ? user.address : "",
      bankAccount: user ? user.bankAccount : "",
      taxIndentification: user ? user.cif : "",
    },
  });

  function onSubmit(values: z.infer<typeof companyFormSchema>) {
    console.log(values);
  }

  return (
    <Section>
      <SectionInfo
        title="Company info"
        description="Update your portfolio and bio."
      />

      <div className="rounded-lg border">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 grid-rows-6 gap-6 p-6 sm:grid-cols-2 sm:grid-rows-5">
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
                          {input.type === "drop" ? (
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={input.defaultValue}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {input.options.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.content}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
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
