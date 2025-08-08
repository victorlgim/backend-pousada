import bcrypt from 'bcryptjs';
import { AppError } from '../../../errors/AppError'
import { IUserRepository } from '../../../domain/repositories/IUserRepository'
import UserRepository from '../../../infrastructure/repositories/UserRepository'

interface IRequest {
  email: string
  resetCode: string
  newPassword: string
}

export class ResetPasswordUseCase {
  constructor(private userRepository: IUserRepository = UserRepository) {}

  public async execute({ email, resetCode, newPassword }: IRequest): Promise<{ message: string }> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new AppError('User not found', 404)
    }

    // 🔹 Verifica se o código está correto
    console.log(`O código de reset armazenado no banco é: >>${user.passwordResetCode}<< e o enviado no corpo da requisição é ${resetCode}`)

    if (user.passwordResetCode !== resetCode) {
      throw new AppError('Invalid reset code', 400)
    }

    // 🔹 Verifica se o código expirou
    if (!user.passwordResetExpiresAt || user.passwordResetExpiresAt < new Date()) {
      throw new AppError('Reset code expired', 400)
    }

    // 🔹 Atualiza a senha
    user.passwordHash = await bcrypt.hash(newPassword, 10)

    // 🔹 Limpa os campos de reset para evitar reutilização
    user.passwordResetCode = null
    user.passwordResetExpiresAt = null

    await this.userRepository.update(user)

    return { message: 'Password reset successful' }
  }
}
