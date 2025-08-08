import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
  } from 'typeorm'
  import { Guest } from './Guest'
  import { Room } from './Room'
  
  @Entity('reservations')
  export class Reservation {
    @PrimaryGeneratedColumn()
    id!: number
  
    @ManyToOne(() => Guest)
    @JoinColumn({ name: 'guest_id' })
    guest!: Guest
  
    @ManyToOne(() => Room)
    @JoinColumn({ name: 'room_id' })
    room!: Room
  
    @Column()
    numberOfGuests!: number
  
    @Column()
    origin!: string
  
    @Column({ type: 'date' })
    checkIn!: Date
  
    @Column({ type: 'date' })
    checkOut!: Date
  
    @Column({ type: 'text', nullable: true })
    notes?: string
  
    @CreateDateColumn()
    createdAt!: Date
  
    @UpdateDateColumn()
    updatedAt!: Date
  }
  