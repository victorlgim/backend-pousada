import 'dotenv/config'
import 'reflect-metadata'
import { DataSource, DataSourceOptions } from 'typeorm'
import { User } from '../domain/entities/User'
import { Room } from '../domain/entities/Room'
import { Guest } from '../domain/entities/Guest'
import { Reservation } from '../domain/entities/Reservation'

const nodeEnv = process.env.NODE_ENV || 'development'

const DB_HOST = process.env.DB_HOST || process.env.POSTGRES_HOST || 'localhost'
const DB_PORT = Number(process.env.DB_PORT || process.env.POSTGRES_PORT || 5432)
const DB_USER = process.env.DB_USER || process.env.POSTGRES_USER || 'postgres'
const DB_PASS = process.env.DB_PASS || process.env.POSTGRES_PASSWORD || 'postgres'
const DB_NAME = process.env.DB_NAME || process.env.POSTGRES_DB || 'postgres'

const logging = nodeEnv !== 'production'

const dataSourceConfig = (): DataSourceOptions => {
  if (nodeEnv === 'test') {
    return {
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: [User, Room, Guest, Reservation],
    }
  }

  return {
    type: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    synchronize: false,
    logging,
    entities: [User, Room, Guest, Reservation],
    migrations: [__dirname + '/../migrations/*.{ts,js}'],
  }
}

export const AppDataSource = new DataSource(dataSourceConfig())
