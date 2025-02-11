import { User } from '../entities/User'

export interface IUserRepository {
  create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>
  findById(id: number): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findByName(name: string): Promise<User | null>
  update(user: User): Promise<User>
}
