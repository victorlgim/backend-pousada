import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
  } from 'typeorm'
  import { Reservation } from './Reservation'
  
  @Entity('guests')
  export class Guest {
    @PrimaryGeneratedColumn()
    id!: number
  
    @Column()
    name!: string
  
    @Column({ unique: true })
    cpf!: string
  
    @Column({ nullable: true })
    phone?: string
  
    @Column({ nullable: true })
    email?: string
  
    @OneToMany(() => Reservation, reservation => reservation.guest)
    reservations?: Reservation[]
  
    @CreateDateColumn()
    createdAt!: Date
  
    @UpdateDateColumn()
    updatedAt!: Date
  }
  