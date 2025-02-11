import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm'
  
  @Entity('users')
  export class User {
    @PrimaryGeneratedColumn()
    id!: number
  
    @Column({ unique: true })
    email!: string
  
    @Column({ unique: true })
    name!: string
  
    @Column()
    passwordHash!: string
  
    // admin', 'supervisor', 'user'
    @Column({ default: 'user' })
    role!: string
  
    @Column({ default: false })
    twoFactorEnabled!: boolean
  
    @Column({ type: "varchar", length: 255, nullable: true })
    twoFactorSecret: string | null;
  
    @CreateDateColumn()
    createdAt!: Date
  
    @UpdateDateColumn()
    updatedAt!: Date
  }
  
  