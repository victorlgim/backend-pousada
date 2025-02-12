import { AppError } from '../../../errors/AppError'
import { IUserRepository } from '../../../domain/repositories/IUserRepository'
import UserRepository from '../../../infrastructure/repositories/UserRepository'
import crypto from 'crypto'
import { sendEmail } from '../../../infrastructure/services/MailService' 

interface IRequest {
  email: string
}

export class RequestPasswordResetUseCase {
  constructor(private userRepository: IUserRepository = UserRepository) {}

  public async execute({ email }: IRequest): Promise<{ message: string }> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new AppError('User not found', 404)
    }

    const resetCode = crypto.randomInt(100000, 999999).toString()

    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + 15)

    user.passwordResetCode = resetCode
    user.passwordResetExpiresAt = expiresAt

    await this.userRepository.update(user)

    await sendEmail(user.email, 'Password Reset Code', `Your reset code is: ${resetCode}`)

    return { message: 'Password reset code sent to your email' }
  }
}
