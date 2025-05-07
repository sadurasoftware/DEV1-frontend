import { z } from 'zod'

export const createTicketValidation = z.object({
    title: z.string()
    .min(1, 'Ticket title is required'),
    description: z.string().min(1, 'Describe a ticket issue'),
    priority: z.string().min(1, 'Priority is required'),
    category: z.string().min(1, 'Category is required'),
})
