import { z } from "zod";

const registerSchema = z.object({
  name: z.string().trim().min(2).max(50),
  email: z.string().trim().min(5).max(255).toLowerCase().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().min(2).max(255).email(),
  password: z.string().min(6),
});

export { registerSchema, loginSchema };
