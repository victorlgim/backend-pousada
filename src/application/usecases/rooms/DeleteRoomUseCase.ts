import RoomRepository from '../../../infrastructure/repositories/RoomRepository'
import { AppError } from '../../../errors/AppError'

export class DeleteRoomUseCase {
  async execute(id: number) {
    const room = await RoomRepository.findById(id)
    if (!room) throw new AppError('Room not found', 404)
    await RoomRepository.delete(id)
  }
}
