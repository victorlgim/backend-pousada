import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../../errors/AppError';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export class AuthMiddleware {
  public verifyToken(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(new AppError('No token provided', 401));
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: number; role: string };
      (req as any).user = decoded;
      next();
    } catch (error) {
      return next(new AppError('Invalid token', 401));
    }
  }

  public permit(...allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
      const user = (req as any).user;
      if (!user) {
        return next(new AppError('Unauthorized', 401));
      }
      if (!allowedRoles.includes(user.role)) {
        return next(new AppError('Forbidden: Insufficient permissions', 403));
      }
      next();
    };
  }
}

export default new AuthMiddleware();
