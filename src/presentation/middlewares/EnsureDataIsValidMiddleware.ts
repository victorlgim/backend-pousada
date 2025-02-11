import { NextFunction, Request, Response } from 'express'
import { ZodSchema } from 'zod'
import { AppError } from '../../errors/AppError'

export const EnsureDataIsValidMiddleware = (schema: ZodSchema) => (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    })
    next()
  } catch (error: any) {
    next(new AppError(error.message, 400))
  }
}
