import { z } from 'zod'

export const RequestPasswordResetSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email format.' })
  })
})
