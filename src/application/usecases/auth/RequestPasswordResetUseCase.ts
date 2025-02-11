import jwt from 'jsonwebtoken'
import { AppError } from '../../../errors/AppError'
import { IUserRepository } from '../../../domain/repositories/IUserRepository'
import UserRepository from '../../../infrastructure/repositories/UserRepository'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'

interface IRequest {
  email: string
}

export class RequestPasswordResetUseCase {
  constructor(private userRepository: IUserRepository = UserRepository) {}

  public async execute({ email }: IRequest): Promise<{ resetToken: string }> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new AppError('User not found', 404)
    }

    const resetToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '15m' })
    return { resetToken }
  }
}
