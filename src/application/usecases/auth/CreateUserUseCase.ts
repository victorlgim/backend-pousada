import { User } from '../../../domain/entities/User'
import { IUserRepository } from '../../../domain/repositories/IUserRepository'
import UserRepository from '../../../infrastructure/repositories/UserRepository'
import { AppError } from '../../../errors/AppError'
import bcrypt from 'bcrypt'

interface IRequest {
  email: string
  name: string
  password: string
  role?: string
}

export class CreateUserUseCase {

  constructor(private userRepository: IUserRepository = UserRepository) {}

  public async execute({ email, name, password, role = 'user' }: IRequest): Promise<User> {

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await this.userRepository.create({
      email,
      name,
      passwordHash,
      role,
      twoFactorEnabled: false,
      twoFactorSecret: null
    })

    if (!user) {
      throw new AppError('User registration failed', 400)
    }

    return user
  }
}
