import { z } from "zod";

export const authenticationSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 charachters." }),
});

export type FormValues = z.infer<typeof authenticationSchema>