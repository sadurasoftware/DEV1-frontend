import { z } from 'zod'

export const settingsValidation = z.object({
    name: z.string()
    .min(1, 'name is required')
    .min(3, 'Name is too short, at least 3 characters are required'),
})

