import ReservationRepository from '../../../infrastructure/repositories/ReservationRepository'
import { AppError } from '../../../errors/AppError'

export class DeleteReservationUseCase {
  async execute(id: number) {
    const current = await ReservationRepository.findById(id)
    if (!current) throw new AppError('Reservation not found', 404)
    await ReservationRepository.delete(id)
  }
}
