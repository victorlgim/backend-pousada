import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../../infrastructure/data-source'
import { User } from '../../domain/entities/User'
import { AppError } from '../../errors/AppError'
import { Repository } from 'typeorm'

export const EnsureUserExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User)
  
  const userId = Number(req.params.id)
  
  const user = await userRepository.findOne({
    where: { id: userId }
  })

  if (!user) {
    return next(new AppError('User not found', 404))
  }

  next()
}
