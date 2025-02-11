import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../../infrastructure/data-source'
import { User } from '../../domain/entities/User'
import { AppError } from '../../errors/AppError'
import { Repository } from 'typeorm'

export const CheckDuplicateUserEmailMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const email: string = req.body.email
  const userRepository: Repository<User> = AppDataSource.getRepository(User)
  
  const existingUser = await userRepository.findOne({
    where: { email }
  })

  if (existingUser) {
    return next(new AppError('Email already exists', 409))
  }

  next()
}
