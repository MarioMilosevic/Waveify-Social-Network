import { z } from "zod";

export const authenticationSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 charachters." }),
});

export const commentSchema = z.object({
  comment: z.string().min(1),
});

export const textSchema = z.object({
  text: z.string().min(2),
});

export type FormValues = z.infer<typeof authenticationSchema>;
export type CommentValue = z.infer<typeof commentSchema>;
export type StatusValue = z.infer<typeof textSchema>;
