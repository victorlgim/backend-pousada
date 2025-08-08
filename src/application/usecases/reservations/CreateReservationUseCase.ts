import GuestRepository from '../../../infrastructure/repositories/GuestRepository'
import RoomRepository from '../../../infrastructure/repositories/RoomRepository'
import ReservationRepository from '../../../infrastructure/repositories/ReservationRepository'
import { AppError } from '../../../errors/AppError'

export class CreateReservationUseCase {
  async execute(data: any): Promise<any> {
    const checkIn = new Date(data.reservation.checkIn)
    const checkOut = new Date(data.reservation.checkOut)

    if (checkOut <= checkIn) throw new AppError('Check-out must be after check-in', 400)

    const room = await RoomRepository.findById(data.reservation.roomId)
    if (!room) throw new AppError('Room not found', 404)

    const conflicts = await ReservationRepository.findConflicting(
      data.reservation.roomId,
      checkIn,
      checkOut
    )
    if (conflicts.length > 0) throw new AppError('Room is not available for the selected period', 400)

    let guest = await GuestRepository.findByCPF(data.guest.cpf)
    if (!guest) {
      guest = await GuestRepository.create(data.guest)
    }

    const reservation = await ReservationRepository.create({
      guest,
      room,
      checkIn,
      checkOut,
      numberOfGuests: data.reservation.numberOfGuests,
      origin: data.reservation.origin,
      notes: data.reservation.notes ?? undefined
    })

    return reservation
  }
}
