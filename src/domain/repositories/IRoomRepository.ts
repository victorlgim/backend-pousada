import { Room } from '../entities/Room'

export interface IRoomRepository {
  create(room: Omit<Room, 'id' | 'createdAt' | 'updatedAt'>): Promise<Room>
  findByNumber(number: string): Promise<Room | null>
  findById(id: number): Promise<Room | null>
  listAll(): Promise<Room[]>
  update(room: Room): Promise<Room>
  delete(id: number): Promise<void>
}
