import React from "react";

import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addLinkFormSchema as formSchema } from "./constants";

import type { User } from "@supabase/supabase-js";
import Heading from "../heading";

interface AddLinkFormProps {
  user: User | undefined;
}

const AddLinkForm = ({ user }: AddLinkFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  const isLoading = form.formState.isLoading;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { title, url } = values;
    if (!user) return;
    try {
      const { data } = await axios.post("/api/links", {
        title,
        url,
        user_id: user.id,
      });
      console.log(data);
    } catch (error) {
      console.log("INSERT_ERROR", error);
    }
  };

  return (
    <div className="flex-col w-full">
      <Heading title="Add Link" className="mb-6" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Influencer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://tiktok.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full mt-8" disabled={isLoading}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddLinkForm;
