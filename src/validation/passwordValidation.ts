import { z } from 'zod'

export const passwordValidation = z.object({
  password: z
    .string()
    .min(1, 'Password is required')
    .max(20, 'Password cannot be more than 20 characters')
    .min(8, 'Password must be at least 8 characters')
   ,
  confirmPassword: z
    .string()
    .min(1, 'Confirm password is required'),
})
