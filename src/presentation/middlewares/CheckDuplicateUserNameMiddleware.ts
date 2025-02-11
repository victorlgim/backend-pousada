import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../../infrastructure/data-source'
import { User } from '../../domain/entities/User'
import { AppError } from '../../errors/AppError'
import { Repository } from 'typeorm'

export const CheckDuplicateUserNameMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const name: string = req.body.name
  const userRepository: Repository<User> = AppDataSource.getRepository(User)
  
  const existingUser = await userRepository.findOne({
    where: { name }
  })

  if (existingUser) {
    return next(new AppError('Name already exists', 409))
  }

  next()
}
