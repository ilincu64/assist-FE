import * as z from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { SecondStepSignupSchema } from "../../schemas/signup";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getLocalStorageItem } from "../../utils/getLocalStorageItem";
import { AuthApi } from "../../api/AuthApi";
import toast from "react-hot-toast";

const FinalStepSignUpForm = () => {
  const navigate = useNavigate();
  const savedLocalData = getLocalStorageItem("signupLocalStorageData");

  const form = useForm<z.infer<typeof SecondStepSignupSchema>>({
    resolver: zodResolver(SecondStepSignupSchema),
    defaultValues: {
      companyName: "",
      entityType: "",
      entitySize: "",
      address: "",
      bankAccount: "",
      cif: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SecondStepSignupSchema>) => {
    const data = { ...savedLocalData, ...values };
    delete data.confirmPassword;

    AuthApi.createUser(data)
      .then((res) => {
        if (res) {
          toast.success(res.data);
          localStorage.removeItem("signupLocalStorageData");
          navigate("/auth/login");
        }
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Ex: CompanySRL" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* start of select */}
        <div className="flex flex-col gap-2 md:flex-row">
          <FormField
            control={form.control}
            name="entityType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Entity Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue="">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select entity type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="SRL">SRL</SelectItem>
                    <SelectItem value="SA">SA</SelectItem>
                    <SelectItem value="SNC">SNC</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="entitySize"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Entity Size</FormLabel>
                <Select onValueChange={field.onChange} defaultValue="">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select entity size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="SMALL">Small</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="BIG">Big</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Address</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Tipografiei 1" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bankAccount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Account</FormLabel>
              <FormControl>
                <Input placeholder="Ex: ING 123456789" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cif"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax identification number</FormLabel>
              <FormControl>
                <Input placeholder="Ex: RO123456789" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-2">
          <Button
            className="w-full text-primary"
            asChild
            type="button"
            variant="outline"
          >
            <Link to="/auth/signup">Go back</Link>
          </Button>
          <Button className="w-full text-white" type="submit">
            Create Account
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FinalStepSignUpForm;
