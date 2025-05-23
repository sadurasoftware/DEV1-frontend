import { z } from 'zod'

export const loginschema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid Email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Invalid password!'),
})
