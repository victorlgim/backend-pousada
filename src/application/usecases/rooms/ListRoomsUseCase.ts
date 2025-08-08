import RoomRepository from '../../../infrastructure/repositories/RoomRepository'

export class ListRoomsUseCase {
  async execute() {
    return await RoomRepository.listAll()
  }
}
