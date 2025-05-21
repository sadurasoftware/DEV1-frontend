import { z } from 'zod'

export const countryValidation = z.object({
    countryName: z.string()
    .min(1, 'Country name cannot be empty'),
   
})
