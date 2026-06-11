import z from "zod";

export const RegisterUserSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format for dateOfBirth",
  }).transform((date) => new Date(date)),
});

export type RegisterUser = z.infer<typeof RegisterUserSchema>;