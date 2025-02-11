import { z } from 'zod'

export const ResetPasswordSchema = z.object({
  body: z.object({
    resetToken: z.string().min(1, { message: 'Reset token is required.' }),
    newPassword: z.string().min(6, { message: 'Password must be at least 6 characters long.' })
  })
})
