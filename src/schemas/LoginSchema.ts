import { z } from 'zod'

export const LoginSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Formato de e-mail inválido.' }),
    password: z.string().min(6, { message: 'A senha deve conter no mínimo 6 caracteres.' })
  })
})
