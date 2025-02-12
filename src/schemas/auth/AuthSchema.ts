import { z } from 'zod'

export const CreateUserSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email format.' }),
    name: z.string().min(3, { message: 'Name must be at least 3 characters long.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
    role: z.string().optional() 
  })
})

export const LoginSchema = z.object({
    body: z.object({
      email: z.string().email({ message: 'Invalid email format.' }),
      password: z.string().min(6, { message: 'The password must contain at least 6 characters.' })
    })
  })


export const RequestPasswordResetSchema = z.object({
    body: z.object({
      email: z.string().email({ message: 'Invalid email format.' })
    })
  })

export const ResetPasswordSchema = z.object({
  body: z.object({
    resetCode: z.string().min(1, { message: 'Reset token is required.' }),
    newPassword: z.string().min(6, { message: 'Password must be at least 6 characters long.' })
  })
})
