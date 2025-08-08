import ReservationRepository from '../../../infrastructure/repositories/ReservationRepository'

export class ListReservationsUseCase {
  async execute() {
    return await ReservationRepository.listAll()
  }
}
