"use client";

import React, { useRef, useState } from "react";
import ImageUpload from "../image-upload";
import { Button } from "../ui/button";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { profileFormSchema as formSchema } from "./constants";
import { Input } from "../ui/input";

const ProfileForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: {} as File,
    },
  });

  const { isLoading } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { image } = values;
    console.log(image);

    if (!image) return;
    try {
      // console.log(image);
      // const formData = new FormData();
      // formData.append("image", image);
      // formData.append("image_name", image.name);
      // const { data } = await axios.post("/api/profile/picture", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data", // Set the content type for file upload
      //   },
      // });
      // console.log(data);
    } catch (error) {
      console.log("PROFILE_IMAGE_UPLOAD_ERROR", error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="image"
            render={({ field: { value, ...field } }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    {...field}
                    onChange={(e) => {
                      if (!e.target.files) return;
                      field.onChange(e.target.files[0]);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} className="w-full mt-4">
            Update Profile Image
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProfileForm;
