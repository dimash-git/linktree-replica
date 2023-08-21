import * as z from "zod";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const addLinkFormSchema = z.object({
  title: z.string().min(2, {
    message: "Please enter Title",
  }),
  url: z
    .string()
    .min(2, { message: "Please enter URL" })
    .url("It is not a valid URL"),
});

const profileFormSchema = z.object({
  image: z
    .any()
    .refine((file) => file?.name, "Image is required.")
    .refine(
      (file) => file?.size < MAX_FILE_SIZE,
      `Max file size is ${MAX_FILE_SIZE / 1000000} MB.`
    ) // this should be greater than or equals (>=) not less that or equals (<=)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp files are accepted."
    ),
});

export { addLinkFormSchema, profileFormSchema };
