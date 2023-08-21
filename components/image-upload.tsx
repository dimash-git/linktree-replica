import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { Input } from "./ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { UseFormReturn } from "react-hook-form";

const ImageUpload = ({
  form,
}: {
  form: UseFormReturn<{ image: File }, any, undefined>;
}) => {
  return (
    <>
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input
                type="file"
                hidden
                {...field}
                // onChange={(e) => {
                //   if (!e.target.files![0].type.startsWith("image/")) return;
                // setImage(e.target.files![0]);
                // }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* {image && (
        <Image
          src={URL.createObjectURL(image)}
          width={300}
          height={300}
          alt="Uploaded Image"
          className="w-full h-32 object-cover hover:grayscale transition-all duration-150 cursor-not-allowed mt-4 rounded-sm"
          onClick={() => {
            setImage(null);
            imageRef.current!.value = "";
          }}
        />
      )} */}
    </>
  );
};

export default ImageUpload;
