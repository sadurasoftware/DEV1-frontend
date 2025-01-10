import {z} from "zod";

export const loginschema = z.object({
    email: z
      .string()
      .email('Please enter a valid Email')
      .min(1, "Email is required"),
    password: z
      .string()
      .min(3, 'Password must be at least 3 characters')
      .min(1,"Password is required"),    
  });

