import { z } from "zod";

export const designationValidation = z.object({
    designationName: z.string()
    .min(1, 'Designation name cannot be empty')
    .min(3, 'Name is too short, at least 3 characters are required'),
   
})