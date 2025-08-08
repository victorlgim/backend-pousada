import { IRoomRepository } from '../../../domain/repositories/IRoomRepository'
import { Room } from '../../../domain/entities/Room'
import RoomRepository from '../../../infrastructure/repositories/RoomRepository'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  number: string
  capacity: number
  pricePerNight: number
  category: any
}

export class CreateRoomUseCase {
  constructor(private roomRepo: IRoomRepository = RoomRepository) {}

  async execute(data: IRequest): Promise<Room> {
    const existingRoom = await this.roomRepo.findByNumber(data.number)
    if (existingRoom) {
      throw new AppError('Room number already exists', 400)
    }

    const room = await this.roomRepo.create({ ...data })
    return room
  }
}
