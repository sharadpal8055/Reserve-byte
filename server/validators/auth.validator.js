import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()

    .min(3, "Name must have 3 characters"),

  email: z
    .string()

    .email("Invalid email"),

  password: z
    .string()

    .min(6, "Password minimum 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().email(),

  password: z.string().min(6),
});
