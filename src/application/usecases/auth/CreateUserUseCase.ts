import { User, UserRole } from '../../../domain/entities/User';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import UserRepository from '../../../infrastructure/repositories/UserRepository';
import { AppError } from '../../../errors/AppError';
import bcrypt from 'bcrypt';

interface IRequest {
  email: string;
  name: string;
  password: string;
  role?: UserRole;
}

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository = UserRepository) {}

  public async execute({ email, name, password, role = UserRole.USER }: IRequest): Promise<User> {

    if (!Object.values(UserRole).includes(role)) {
      throw new AppError('Invalid role', 400);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User();
    user.email = email;
    user.name = name;
    user.passwordHash = passwordHash;
    user.role = role;
    user.twoFactorEnabled = false;
    user.twoFactorSecret = null;
    user.passwordResetCode = null;
    user.passwordResetExpiresAt = null;

    const savedUser = await this.userRepository.create(user);

    if (!savedUser) {
      throw new AppError('User registration failed', 400);
    }

    return savedUser;
  }
}
