import { AppDataSource } from '../data-source'
import { Guest } from '../../domain/entities/Guest'
import { IGuestRepository } from '../../domain/repositories/IGuestRepository'

export class GuestRepository implements IGuestRepository {
  private repository = AppDataSource.getRepository(Guest)

  async findByCPF(cpf: string): Promise<Guest | null> {
    return await this.repository.findOne({ where: { cpf } })
  }

  async create(guestData: Omit<Guest, 'id' | 'createdAt' | 'updatedAt'>): Promise<Guest> {
    const guest = this.repository.create(guestData)
    return await this.repository.save(guest)
  }
}

export default new GuestRepository()
