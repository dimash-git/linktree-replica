import * as z from "zod";

const formSchema = z
  .object({
    email: z
      .string()
      .min(2, {
        message: "Please enter your email",
      })
      .email("This is not a valid email."),
    password: z.string().min(8, { message: "Min 8 characters" }),
    confirm: z.string().min(8, { message: "Please enter your password again" }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export { formSchema };
