import { z } from 'zod'

export const CreateUserSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email format.' }),
    name: z.string().min(3, { message: 'Name must be at least 3 characters long.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
    role: z.string().optional() 
  })
})
