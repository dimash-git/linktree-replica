import * as z from "zod";

const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Please enter your email",
    })
    .email("This is not a valid email."),
  password: z.string().min(8, { message: "Min 8 characters" }),
});

export { formSchema };
