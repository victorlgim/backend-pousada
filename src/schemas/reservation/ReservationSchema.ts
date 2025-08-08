// src/schemas/reservation/ReservationSchema.ts
import { z } from 'zod'

export const CreateReservationSchema = z.object({
  guest: z.object({
    name: z.string().min(1),
    cpf: z.string().min(1),
    phone: z.string().min(1),
    email: z.string().email().optional(),
  }),
  reservation: z.object({
    roomId: z.number().int().positive(),
    checkIn: z.string().transform((s) => new Date(s)),
    checkOut: z.string().transform((s) => new Date(s)),
    numberOfGuests: z.number().int().positive(),
    origin: z.string().min(1),
    notes: z.string().optional(),
  }),
})

export const UpdateReservationSchema = z.object({
  reservationId: z.number().int().positive(),
  reservation: z.object({
    roomId: z.number().int().positive().optional(),
    checkIn: z.string().optional().transform((s) => (s ? new Date(s) : undefined)),
    checkOut: z.string().optional().transform((s) => (s ? new Date(s) : undefined)),
    numberOfGuests: z.number().int().positive().optional(),
    origin: z.string().optional(),
    notes: z.string().optional(),
  }),
})

export const ReservationIdParamSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number),
})
