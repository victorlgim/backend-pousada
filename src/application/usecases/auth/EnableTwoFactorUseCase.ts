import { AppError } from '../../../errors/AppError'
import speakeasy from 'speakeasy'
import { User } from '../../../domain/entities/User'
import { IUserRepository } from '../../../domain/repositories/IUserRepository'
import UserRepository from '../../../infrastructure/repositories/UserRepository'

interface IRequest {
  userId: number
  token2fa: string
}

export class EnableTwoFactorUseCase {
  
  constructor(private userRepository: IUserRepository = UserRepository) {}

  public async execute({ userId, token2fa }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(userId)
    if (!user || !user.twoFactorSecret) {
      throw new AppError('User not found or 2FA secret not generated', 404)
    }
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: token2fa
    })
    if (!verified) {
      throw new AppError('Invalid 2FA token', 400)
    }
    user.twoFactorEnabled = true
    await this.userRepository.update(user)
    return user
  }
}
