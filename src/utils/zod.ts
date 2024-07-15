import { z } from "zod";

export const authenticationSchema = z.object({
  email: z.string().email({ message: "Account not found !" }),
  password: z.string().min(6, { message: "Incorrect password !" }),
});

export type FormValues = z.infer<typeof authenticationSchema>