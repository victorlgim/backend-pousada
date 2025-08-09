// src/schemas/room/RoomSchema.ts
import { z } from 'zod'

const categoryOptions = ['Standard', 'Chalé', 'Luxo'] as const

export const CreateRoomSchema = z.object({
  number: z.string().min(1),
  capacity: z.coerce.number().int().min(1),
  pricePerNight: z.coerce.number().min(0),
  category: z.enum(categoryOptions),
})

export const UpdateRoomSchema = z.object({
  number: z.string().min(1).optional(),
  capacity: z.coerce.number().int().min(1).optional(),
  pricePerNight: z.coerce.number().min(0).optional(),
  category: z.enum(categoryOptions).optional(),
})

export const IdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
})
