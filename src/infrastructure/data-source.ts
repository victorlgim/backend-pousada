import 'dotenv/config'
import 'reflect-metadata'
import { DataSource, DataSourceOptions } from 'typeorm'
import { User } from '../domain/entities/User'

const dataSourceConfig = (): DataSourceOptions => {
  const nodeEnv = process.env.NODE_ENV

  if (nodeEnv === 'test') {
    return {
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: [__dirname + '/../domain/entities/*.{ts,js}']
    }
  }

  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'myuser',
    password: process.env.DB_PASS || 'mypassword',
    database: process.env.DB_NAME || 'sowadb',
    synchronize: false,
    logging: true,
    entities: [__dirname + '/../domain/entities/*.{ts,js}'],
    migrations: [__dirname + '/../migrations/*.{ts,js}']
  }
}

export const AppDataSource = new DataSource(dataSourceConfig())
