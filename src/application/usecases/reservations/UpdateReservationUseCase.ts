import RoomRepository from '../../../infrastructure/repositories/RoomRepository'
import ReservationRepository from '../../../infrastructure/repositories/ReservationRepository'
import { AppError } from '../../../errors/AppError'

export class UpdateReservationUseCase {
  async execute(data: {
    reservationId: number
    reservation: {
      roomId?: number
      checkIn?: Date
      checkOut?: Date
      numberOfGuests?: number
      origin?: string
      notes?: string
    }
  }) {
    const current = await ReservationRepository.findById(data.reservationId)
    if (!current) throw new AppError('Reservation not found', 404)

    const checkIn = data.reservation.checkIn ?? current.checkIn
    const checkOut = data.reservation.checkOut ?? current.checkOut
    if (checkOut <= checkIn) throw new AppError('Check-out must be after check-in', 400)

    const roomId = data.reservation.roomId ?? current.room.id
    const room = await RoomRepository.findById(roomId)
    if (!room) throw new AppError('Room not found', 404)

    const conflicts = await ReservationRepository.findConflicting(roomId, checkIn, checkOut)
    if (conflicts.some(r => r.id !== current.id)) {
      throw new AppError('Room is not available for the selected period', 400)
    }

    current.room = room
    current.checkIn = checkIn
    current.checkOut = checkOut
    if (data.reservation.numberOfGuests !== undefined) current.numberOfGuests = data.reservation.numberOfGuests
    if (data.reservation.origin !== undefined) current.origin = data.reservation.origin
    if (data.reservation.notes !== undefined) current.notes = data.reservation.notes

    return await ReservationRepository.update(current)
  }
}
