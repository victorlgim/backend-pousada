import RoomRepository from '../../../infrastructure/repositories/RoomRepository'
import { AppError } from '../../../errors/AppError'
import { Room } from '../../../domain/entities/Room'

interface IRequest {
  id: number
  number: string
  capacity: number
  pricePerNight: number
  category: any
}

export class UpdateRoomUseCase {
  async execute({ id, number, capacity, pricePerNight, category }: IRequest): Promise<Room> {
    const existing = await RoomRepository.findById(id)
    if (!existing) throw new AppError('Room not found', 404)

    existing.number = number
    existing.capacity = capacity
    existing.pricePerNight = pricePerNight
    existing.category = category

    return await RoomRepository.update(existing)
  }
}
