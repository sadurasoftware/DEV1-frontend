import { z } from 'zod';

export const registerValidation = z.object({
  username: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password should be at least 6 characters'),
  terms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
});
