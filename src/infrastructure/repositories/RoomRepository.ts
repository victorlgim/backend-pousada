import { AppDataSource } from '../data-source'
import { Room } from '../../domain/entities/Room'
import { IRoomRepository } from '../../domain/repositories/IRoomRepository'

export class RoomRepository implements IRoomRepository {
  private repository = AppDataSource.getRepository(Room)

  async create(room: Omit<Room, 'id' | 'createdAt' | 'updatedAt'>): Promise<Room> {
    const newRoom = this.repository.create(room)
    return this.repository.save(newRoom)
  }

  async findByNumber(number: string): Promise<Room | null> {
    return this.repository.findOne({ where: { number } })
  }

  async findById(id: number): Promise<Room | null> {
    // ✅ category é coluna, não relação
    return this.repository.findOne({ where: { id } })
  }

  async listAll(): Promise<Room[]> {
    // ✅ sem relations
    return this.repository.find()
  }

  async update(room: Room): Promise<Room> {
    return this.repository.save(room)
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id)
  }
}

export default new RoomRepository()
