import { z } from 'zod'

export const commentValidation = z.object({
    commentText: z.string()
    .min(1, 'commentText is required'),
})