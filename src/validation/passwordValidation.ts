import { z } from 'zod'

export const passwordValidation = z.object({
  password: z
    .string()
    .min(1, 'Password is required')
    .max(20, 'Password cannot be more than 20 characters')
    .regex(/[A-Z]/, 'Password must contain atleast one Capital letter')
    .regex(
      /[^A-Za-z0-9]/,
      'Password must contain at least one special character'
    )
    .regex(/[0-9]/, 'Password must contain atleast one Number')
    .min(8, 'Password must be at least 8 characters')
   ,
})
