import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { EnsureDataIsValidMiddleware } from '../middlewares/EnsureDataIsValidMiddleware';
import { ResetPasswordSchema, RequestPasswordResetSchema, LoginSchema, CreateUserSchema } from '../../schemas/auth/AuthSchema';
import { CheckDuplicateUserEmailMiddleware } from '../middlewares/CheckDuplicateUserEmailMiddleware';
import { CheckDuplicateUserNameMiddleware } from '../middlewares/CheckDuplicateUserNameMiddleware';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const AuthRoutes: Router = Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário (Somente Admin)
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: testuser@example.com
 *               name:
 *                 type: string
 *                 example: Test User
 *               password:
 *                 type: string
 *                 example: mysecurepassword
 *               role:
 *                 type: string
 *                 enum: [admin, supervisor, user]
 *                 example: user
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       403:
 *         description: Acesso negado (não é admin)
 */
AuthRoutes.post(
  "/register",
  AuthMiddleware.verifyToken,
  AuthMiddleware.permit("admin"), 
  EnsureDataIsValidMiddleware(CreateUserSchema),
  CheckDuplicateUserEmailMiddleware,
  CheckDuplicateUserNameMiddleware,
  AuthController.register
);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: testuser@example.com
 *               password:
 *                 type: string
 *                 example: mysecurepassword
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       400:
 *         description: Credenciais inválidas
 */
AuthRoutes.post(
  "/login",
  EnsureDataIsValidMiddleware(LoginSchema),
  AuthController.login
);

/**
 * @openapi
 * /auth/password-reset-request:
 *   post:
 *     summary: Solicitação de redefinição de senha
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: testuser@example.com
 *     responses:
 *       200:
 *         description: Token de redefinição de senha enviado
 *       404:
 *         description: Usuário não encontrado
 */
AuthRoutes.post(
  "/password-reset-request",
  EnsureDataIsValidMiddleware(RequestPasswordResetSchema),
  AuthController.requestPasswordReset
);

/**
 * @openapi
 * /auth/reset-password:
 *   post:
 *     summary: Redefinição de senha
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resetToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1...
 *               newPassword:
 *                 type: string
 *                 example: mynewpassword
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *       400:
 *         description: Token inválido ou expirado
 */
AuthRoutes.post(
  "/reset-password",
  EnsureDataIsValidMiddleware(ResetPasswordSchema),
  AuthController.resetPassword
);

// Rotas protegidas com JWT
AuthRoutes.use(AuthMiddleware.verifyToken);

/**
 * @openapi
 * /auth/2fa/generate:
 *   post:
 *     summary: Gera uma secret para autenticação de dois fatores
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Secret gerada com sucesso
 *       401:
 *         description: Token de autenticação inválido
 */
AuthRoutes.post("/2fa/generate", AuthController.generateTwoFactorSecret);

/**
 * @openapi
 * /auth/2fa/enable:
 *   post:
 *     summary: Ativa a autenticação de dois fatores
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token2fa:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Autenticação de dois fatores ativada
 *       400:
 *         description: Código 2FA inválido
 */
AuthRoutes.post("/2fa/enable", AuthController.enableTwoFactor);

export default AuthRoutes;
