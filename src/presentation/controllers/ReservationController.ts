// src/presentation/controllers/ReservationController.ts
import { Request, Response, NextFunction } from 'express'
import { CreateReservationUseCase } from '../../application/usecases/reservations/CreateReservationUseCase'
import { GetReservationUseCase } from '../../application/usecases/reservations/GetReservationUseCase'
import { ListReservationsUseCase } from '../../application/usecases/reservations/ListReservationsUseCase'
import { UpdateReservationUseCase } from '../../application/usecases/reservations/UpdateReservationUseCase'
import { DeleteReservationUseCase } from '../../application/usecases/reservations/DeleteReservationUseCase'

class ReservationController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const useCase = new CreateReservationUseCase()
      const reservation = await useCase.execute(req.body)
      res.status(201).json(reservation)
    } catch (err) { next(err) }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const useCase = new GetReservationUseCase()
      const reservation = await useCase.execute(id)
      res.json(reservation)
    } catch (err) { next(err) }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const useCase = new ListReservationsUseCase()
      const reservations = await useCase.execute()
      res.json(reservations)
    } catch (err) { next(err) }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const useCase = new UpdateReservationUseCase()
      const updated = await useCase.execute(req.body)
      res.json(updated)
    } catch (err) { next(err) }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const useCase = new DeleteReservationUseCase()
      await useCase.execute(id)
      res.status(204).send()
    } catch (err) { next(err) }
  }
}

export default new ReservationController()
