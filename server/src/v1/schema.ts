import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string(),
  password: z.string().min(1),
  email: z.string().email().min(1)
})