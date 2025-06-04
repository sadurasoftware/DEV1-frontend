import { z } from 'zod'

export const countryValidation = z.object({
    countryName: z.string()
    .min(1, 'Country name cannot be empty')
    .min(3, 'Name is too short, at least 3 characters are required'),
   
})

export const stateValidation = z.object({
    stateName: z.string()
    .min(1, 'State name cannot be empty')
    .min(3, 'Name is too short, at least 3 characters are required'),
    countryId: z.number()
    .min(1, 'Choose Country')
   
})

export const locationValidation = z.object({
    locationName: z.string()
    .min(1, 'Location name cannot be empty')
    .min(3, 'Name is too short, at least 3 characters are required'),
    countryId: z.number()
    .min(1, 'Choose Country'),
    stateId: z.number()
    .min(1, 'Choose state')
   
})

export const branchValidation = z.object({
    branchName: z.string()
    .min(1, 'Branch name cannot be empty')
    .min(3, 'Name is too short, at least 3 characters are required'),
    pincode: z.number()
    .min(1, 'Pincode is required')
    .max(999999, 'Pincode is invalid'),
    countryId: z.number()
    .min(1, 'Choose Country'),
    stateId: z.number()
    .min(1, 'Choose state'),
    locationId: z.number()
    .min(1, 'Choose location'),
   
})

