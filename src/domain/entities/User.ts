 import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'

export enum UserRole {
  ADMIN = 'admin',
  SUPERVISOR = 'supervisor',
  USER = 'user',
}

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
    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role!: UserRole;
     
    @Column({ default: false })
    twoFactorEnabled!: boolean

    @Column({ type: "varchar", length: 255, nullable: true })
    twoFactorSecret: string | null

    @Column({ type: "varchar", length: 6, nullable: true })
    passwordResetCode!: string | null

    @Column({ type: "timestamp", nullable: true })
    passwordResetExpiresAt!: Date | null

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}
