import { NextFunction, Request, Response } from 'express'
import { ZodSchema } from 'zod'
import { AppError } from '../../errors/AppError'

export const EnsureDataIsValidMiddleware = (schema: ZodSchema) => (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  try {
    const parsed = schema.parse(req.body) // <--- valida a raiz do body
    req.body = parsed                     // opcional: já usa o normalizado
    next()
  } catch (err: any) {
    // melhora a mensagem do Zod
    const message = err?.issues
      ? err.issues.map((i: any) => `${i.path.join('.')}: ${i.message}`).join(' | ')
      : err.message
    next(new AppError(message, 400))
  }
}
