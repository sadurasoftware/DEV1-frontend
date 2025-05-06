import { z } from 'zod'

export const registerValidation = z.object({
  firstname: z.string()
  .min(3, 'First name must be atleast 3 characters.')
    .min(1, 'First Name is required'),
  lastname: z.string().min(1, 'Last Name is required'),
  email: z.string().email('Please enter a valid email'),
  password: z
    .string()
    .max(20, 'Password cannot be more than 20 characters')
    .min(8, 'Password must be at least 8 characters')
    .min(1, 'Password is required'),
  department:z.string()
            .min(1, 'Department is required'),
  terms: z
    .boolean()
    .refine(val => val === true, 'You must accept the terms and conditions'),
})
