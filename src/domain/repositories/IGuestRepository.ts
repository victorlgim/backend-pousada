// src/domain/repositories/IGuestRepository.ts

import { Guest } from '../entities/Guest'

export interface IGuestRepository {
  findByCPF(cpf: string): Promise<Guest | null>
  create(guest: {
    name: string
    cpf: string
    phone?: string
    email?: string
  }): Promise<Guest>
}
