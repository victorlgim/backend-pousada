import { Request, Response, NextFunction } from 'express'
import { CreateRoomUseCase } from '../../application/usecases/rooms/CreateRoomUseCase'
import { ListRoomsUseCase } from '../../application/usecases/rooms/ListRoomsUseCase'
import { GetRoomByIdUseCase } from '../../application/usecases/rooms/GetRoomByIdUseCase'
import { UpdateRoomUseCase } from '../../application/usecases/rooms/UpdateRoomUseCase'
import { DeleteRoomUseCase } from '../../application/usecases/rooms/DeleteRoomUseCase'

class RoomController {
  async create(req: Request, res: Response, next: NextFunction) {
    const useCase = new CreateRoomUseCase()
    const room = await useCase.execute(req.body)
    res.status(201).json(room)
  }

  async list(req: Request, res: Response, next: NextFunction) {
    const useCase = new ListRoomsUseCase()
    const rooms = await useCase.execute()
    res.status(200).json(rooms)
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const useCase = new GetRoomByIdUseCase()
    const room = await useCase.execute(Number(req.params.id))
    res.status(200).json(room)
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const useCase = new UpdateRoomUseCase()
    const updated = await useCase.execute({
      id: Number(req.params.id),
      ...req.body,
    })
    res.status(200).json(updated)
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const useCase = new DeleteRoomUseCase()
    await useCase.execute(Number(req.params.id))
    res.status(204).send()
  }
}

export default new RoomController()
