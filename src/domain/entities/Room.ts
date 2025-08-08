import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
  } from 'typeorm'
  
  export enum RoomCategory {
    STANDARD = 'Standard',
    CHALET = 'Chalé',
    LUXURY = 'Luxo'
  }
  
  @Entity('rooms')
  export class Room {
    @PrimaryGeneratedColumn()
    id!: number
  
    @Column({ unique: true })
    number!: string
  
    @Column()
    capacity!: number
  
    @Column()
    pricePerNight!: number
  
    @Column({
      type: 'enum',
      enum: RoomCategory,
      default: RoomCategory.STANDARD
    })
    category!: RoomCategory
  
    @CreateDateColumn()
    createdAt!: Date
  
    @UpdateDateColumn()
    updatedAt!: Date
  }
  