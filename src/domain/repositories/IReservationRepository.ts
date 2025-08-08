// src/domain/repositories/IReservationRepository.ts
import { Guest } from '../entities/Guest'
import { Room } from '../entities/Room'
import { Reservation } from '../entities/Reservation'

export interface IReservationRepository {
  create(data: {
    guest: Guest
    room: Room
    checkIn: Date
    checkOut: Date
    numberOfGuests: number
    origin: string
    notes?: string
  }): Promise<Reservation>

  // NOVOS:
  findById(id: number): Promise<Reservation | null>
  listAll(): Promise<Reservation[]>
  update(reservation: Reservation): Promise<Reservation>
  delete(id: number): Promise<void>

  findConflicting(roomId: number, checkIn: Date, checkOut: Date): Promise<Reservation[]>
}
