import { z } from 'zod'

export const createTicketValidation = z.object({
    title: z.string()
    .min(1, 'Ticket title is required'),
    description: z.string().min(1, 'Ticket issue cannot be empty'),
    priority: z.string().min(1, 'Priority is required'),
    category: z.string().min(1, 'Category is required'),
})
