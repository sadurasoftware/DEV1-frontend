import { z } from 'zod'

export const countryValidation = z.object({
    countryName: z.string()
    .min(1, 'Country name cannot be empty'),
   
})

export const stateValidation = z.object({
    stateName: z.string()
    .min(1, 'State name cannot be empty'),
    countryId: z.number()
    .min(1, 'Choose Country')
   
})
