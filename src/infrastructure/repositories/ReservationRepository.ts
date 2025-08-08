// src/infrastructure/repositories/ReservationRepository.ts
import { Guest } from '../../domain/entities/Guest'
import { Room } from '../../domain/entities/Room'
import { Reservation } from '../../domain/entities/Reservation'
import { AppDataSource } from '../data-source'
import { IReservationRepository } from '../../domain/repositories/IReservationRepository'

export class ReservationRepository implements IReservationRepository {
  private repository = AppDataSource.getRepository(Reservation)

  async create(data: {
    guest: Guest
    room: Room
    checkIn: Date
    checkOut: Date
    numberOfGuests: number
    origin: string
    notes?: string
  }): Promise<Reservation> {
    const reservation = this.repository.create(data)
    return await this.repository.save(reservation)
  }

  async findById(id: number): Promise<Reservation | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['guest', 'room'],
    })
  }

  async listAll(): Promise<Reservation[]> {
    return await this.repository.find({
      relations: ['guest', 'room'],
      order: { checkIn: 'ASC' },
    })
  }

  async update(reservation: Reservation): Promise<Reservation> {
    return await this.repository.save(reservation)
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id)
  }

  async findConflicting(roomId: number, checkIn: Date, checkOut: Date): Promise<Reservation[]> {
    // Se seu @JoinColumn é name: 'room_id', recomendo usar "room_id" aqui.
    return await this.repository
      .createQueryBuilder('reservation')
      .where('reservation."room_id" = :roomId', { roomId }) // <- ajuste se necessário
      .andWhere('reservation."checkIn" < :checkOut AND reservation."checkOut" > :checkIn', {
        checkOut, checkIn,
      })
      .getMany()
  }
}

export default new ReservationRepository()
