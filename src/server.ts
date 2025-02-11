import 'reflect-metadata'
import 'dotenv/config'
import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { AppDataSource } from './infrastructure/data-source'
import authRoutes from './presentation/routes/AuthRoutes'
import { handleErrors } from './errors/AppError'

const app: Application = express()

app.use(cors()) 
app.use(helmet()) 
app.use(morgan('dev')) 
app.use(express.json()) 

app.use('/api/auth', authRoutes)

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'API is running' })
})

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  handleErrors(error, req, res, next)
})

const PORT = process.env.PORT || 5000
AppDataSource.initialize()
  .then(() => {
    console.log('✅ Database connected successfully')
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error)
  })
