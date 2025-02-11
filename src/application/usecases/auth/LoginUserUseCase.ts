import { AppError } from '../../../errors/AppError'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { IUserRepository } from '../../../domain/repositories/IUserRepository'
import UserRepository from '../../../infrastructure/repositories/UserRepository'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'

interface IRequest {
  email: string
  password: string
}

export class LoginUserUseCase {
  constructor(private userRepository: IUserRepository = UserRepository) {}

  public async execute({ email, password }: IRequest): Promise<{ token?: string; twoFactorRequired?: boolean; userId?: number }> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new AppError('User not found', 404)
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash)
    if (!passwordMatch) {
      throw new AppError('Invalid credentials', 400)
    }

    if (user.twoFactorEnabled) {
      return { twoFactorRequired: true, userId: user.id }
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' })
    return { token }
  }
}
