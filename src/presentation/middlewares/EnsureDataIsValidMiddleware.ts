import { NextFunction, Request, Response } from 'express'
import { ZodSchema } from 'zod'
import { AppError } from '../../errors/AppError'

export const EnsureDataIsValidMiddleware = (schema: ZodSchema<any>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body)
      next()
    } catch (e: any) {
      next(new AppError(e.message, 400))
    }
  }
