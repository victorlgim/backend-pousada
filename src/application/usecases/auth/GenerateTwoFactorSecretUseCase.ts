import { AppError } from '../../../errors/AppError'
import speakeasy from 'speakeasy'
import { IUserRepository } from '../../../domain/repositories/IUserRepository'
import UserRepository from '../../../infrastructure/repositories/UserRepository'

interface IRequest {
  userId: number
}

export class GenerateTwoFactorSecretUseCase {
  constructor(private userRepository: IUserRepository = UserRepository) {}

  public async execute({ userId }: IRequest): Promise<{ base32: string; otpauth_url: string }> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new AppError('User not found', 404)
    }
    
    const secret = speakeasy.generateSecret({ length: 20 })

    if (!secret.otpauth_url) {
      throw new AppError('Failed to generate OTP Auth URL', 500)
    }
    
    user.twoFactorSecret = secret.base32
    await this.userRepository.update(user)
    
    return { base32: secret.base32, otpauth_url: secret.otpauth_url || '' }
  }
}
