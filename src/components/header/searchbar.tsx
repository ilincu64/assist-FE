import { z } from "zod";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";

import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  search: z.string().trim(),
});

export default function SearchBar() {
  const [searchParams] = useSearchParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: searchParams.get("s") || "",
    },
  });
  const navigate = useNavigate();
  const location = useLocation();

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.search === "") return;
    navigate(`/search?s=${values.search}`);
  }

  useEffect(() => {
    if (location.pathname !== "/search") form.reset({ search: "" });
  }, [location.pathname, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-0">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="flex h-full items-center space-y-0 rounded-lg border border-gray-200">
              <button type="submit" className="bg-white px-3 py-3">
                <HiMiniMagnifyingGlass />
              </button>
              <FormControl className="">
                <Input
                  placeholder="Search"
                  {...field}
                  className="h-0 border-none bg-white py-5 pl-0 pr-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
