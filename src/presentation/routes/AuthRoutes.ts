import { Router } from 'express'
import AuthController from '../controllers/AuthController'
import { EnsureDataIsValidMiddleware } from '../middlewares/EnsureDataIsValidMiddleware'
import { CreateUserSchema } from '../../schemas/CreateUserSchema'
import { LoginSchema } from '../../schemas/LoginSchema'
import { RequestPasswordResetSchema } from '../../schemas/RequestPasswordResetSchema'
import { ResetPasswordSchema } from '../../schemas/ResetPasswordSchema'
import { CheckDuplicateUserEmailMiddleware } from '../middlewares/CheckDuplicateUserEmailMiddleware'
import { CheckDuplicateUserNameMiddleware } from '../middlewares/CheckDuplicateUserNameMiddleware'
import AuthMiddleware from '../middlewares/AuthMiddleware'

const AuthRoutes: Router = Router()

AuthRoutes.post(
    '/register',
    EnsureDataIsValidMiddleware(CreateUserSchema),
    CheckDuplicateUserEmailMiddleware,
    CheckDuplicateUserNameMiddleware,
    AuthController.register 
)

AuthRoutes.post(
    '/login', 
    EnsureDataIsValidMiddleware(LoginSchema), 
    AuthController.login
)

AuthRoutes.post(
    '/password-reset-request', 
    EnsureDataIsValidMiddleware(RequestPasswordResetSchema), 
    AuthController.requestPasswordReset
)

AuthRoutes.post(
    '/reset-password', 
    EnsureDataIsValidMiddleware(ResetPasswordSchema), 
    AuthController.resetPassword
)

AuthRoutes.use(
    AuthMiddleware.verifyToken
)

AuthRoutes.post(
    '/2fa/generate', 
    AuthController.generateTwoFactorSecret
)

AuthRoutes.post(
    '/2fa/enable', 
    AuthController.enableTwoFactor
)

export default AuthRoutes
