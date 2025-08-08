import ReservationRepository from '../../../infrastructure/repositories/ReservationRepository'
import { AppError } from '../../../errors/AppError'

export class GetReservationUseCase {
  async execute(id: number) {
    const reservation = await ReservationRepository.findById(id)
    if (!reservation) throw new AppError('Reservation not found', 404)
    return reservation
  }
}
