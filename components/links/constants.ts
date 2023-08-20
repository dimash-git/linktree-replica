import * as z from "zod";

const addLinkFormSchema = z.object({
  title: z.string().min(2, {
    message: "Please enter Title",
  }),
  url: z
    .string()
    .min(2, { message: "Please enter URL" })
    .url("It is not a valid URL"),
});

export { addLinkFormSchema };
