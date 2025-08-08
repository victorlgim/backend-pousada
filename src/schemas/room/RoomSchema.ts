// src/schemas/room/RoomSchema.ts
import { z } from 'zod'

const categoryOptions = ['Standard', 'Chalé', 'Luxo'] as const

export const CreateRoomSchema = z.object({
  body: z.object({
    number: z.string().min(1),
    capacity: z.number().int().min(1),
    pricePerNight: z.number().min(0),
    category: z.enum(categoryOptions)
  })
})

export const UpdateRoomSchema = z.object({
  body: z.object({
    number: z.string().min(1),
    capacity: z.number().int().min(1),
    pricePerNight: z.number().min(0),
    category: z.enum(categoryOptions)
  }),
  params: z.object({
    id: z.string().transform(Number)
  })
})

export const IdParamSchema = z.object({
  params: z.object({
    id: z.string().transform(Number)
  })
})
