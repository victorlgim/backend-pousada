import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { AppError } from '../../../errors/AppError'
import { User } from '../../../domain/entities/User'
import { IUserRepository } from '../../../domain/repositories/IUserRepository'
import UserRepository from '../../../infrastructure/repositories/UserRepository'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'

interface IRequest {
  resetToken: string
  newPassword: string
}

export class ResetPasswordUseCase {
  constructor(private userRepository: IUserRepository = UserRepository) {}

  public async execute({ resetToken, newPassword }: IRequest): Promise<User> {
    let payload: any
    try {
      payload = jwt.verify(resetToken, JWT_SECRET)
    } catch (error) {
      throw new AppError('Invalid or expired reset token', 400)
    }
    const user = await this.userRepository.findById(payload.id)
    if (!user) {
      throw new AppError('User not found', 404)
    }
    user.passwordHash = await bcrypt.hash(newPassword, 10)
    await this.userRepository.update(user)
    return user
  }
}
