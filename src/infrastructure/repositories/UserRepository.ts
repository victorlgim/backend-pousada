import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { User } from '../../domain/entities/User'
import { IUserRepository } from '../../domain/repositories/IUserRepository'

export class UserRepository implements IUserRepository {
  private userRepository: Repository<User>

  constructor() {
    this.userRepository = AppDataSource.getRepository(User)
  }

  async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const user = this.userRepository.create(userData)
    await this.userRepository.save(user)
    return user
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } })
    return user || null
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } })
    return user || null
  }

  async findByName(name: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { name } })
    return user || null
  }

  async update(user: User): Promise<User> {
    await this.userRepository.save(user)
    return user
  }
}

export default new UserRepository()
