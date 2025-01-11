import {z} from "zod";

export const loginschema = z.object({
    email: z
      .string()
      .email('Please enter a valid Email')
      .min(1, "Email is required"),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .min(1,"Password is required"),    
  });

