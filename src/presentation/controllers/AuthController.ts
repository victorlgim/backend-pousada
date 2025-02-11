import { Request, Response, NextFunction } from 'express'
import { CreateUserUseCase } from '../../application/usecases/auth/CreateUserUseCase'
import { LoginUserUseCase } from '../../application/usecases/auth/LoginUserUseCase'
import { RequestPasswordResetUseCase } from '../../application/usecases/auth/RequestPasswordResetUseCase'
import { ResetPasswordUseCase } from '../../application/usecases/auth/ResetPasswordUseCase'
import { GenerateTwoFactorSecretUseCase } from '../../application/usecases/auth/GenerateTwoFactorSecretUseCase'
import { EnableTwoFactorUseCase } from '../../application/usecases/auth/EnableTwoFactorUseCase'

class AuthController {
  public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, name, password, role } = req.body
    const createUserUseCase = new CreateUserUseCase()
    const user = await createUserUseCase.execute({ email, name, password, role })
    res.status(201).json({ message: 'User registered', userId: user.id })
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body
    const loginUserUseCase = new LoginUserUseCase()
    const result = await loginUserUseCase.execute({ email, password })
    res.status(200).json(result)
  }

  public async requestPasswordReset(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email } = req.body
    const requestPasswordResetUseCase = new RequestPasswordResetUseCase()
    const result = await requestPasswordResetUseCase.execute({ email })
    res.status(200).json(result)
  }

  public async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { resetToken, newPassword } = req.body
    const resetPasswordUseCase = new ResetPasswordUseCase()
    const user = await resetPasswordUseCase.execute({ resetToken, newPassword })
    res.status(200).json({ message: 'Password reset successful', userId: user.id })
  }

  public async generateTwoFactorSecret(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = (req as any).user.id
    const generateTwoFactorSecretUseCase = new GenerateTwoFactorSecretUseCase()
    const secret = await generateTwoFactorSecretUseCase.execute({ userId })
    res.status(200).json(secret)
  }

  public async enableTwoFactor(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = (req as any).user.id
    const { token2fa } = req.body
    const enableTwoFactorUseCase = new EnableTwoFactorUseCase()
    await enableTwoFactorUseCase.execute({ userId, token2fa })
    res.status(200).json({ message: 'Two-factor authentication enabled' })
  }
}

export default new AuthController()
