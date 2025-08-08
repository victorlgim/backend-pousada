import { Router } from 'express'
import ReservationController from '../controllers/ReservationController'
import { EnsureDataIsValidMiddleware } from '../middlewares/EnsureDataIsValidMiddleware'
import { CreateReservationSchema, UpdateReservationSchema, ReservationIdParamSchema } from '../../schemas/reservation/ReservationSchema'


const ReservationRoutes = Router()

/**
 * @openapi
 * /reservations:
 *   post:
 *     summary: Cria uma nova reserva
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateReservation'
 *     responses:
 *       201:
 *         description: Reserva criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Dados inválidos ou quarto indisponível
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Quarto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
ReservationRoutes.post(
  '/',
  EnsureDataIsValidMiddleware(CreateReservationSchema),
  ReservationController.create
)

/**
 * @openapi
 * /reservations:
 *   get:
 *     summary: Lista todas as reservas
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 */
ReservationRoutes.get(
  '/',
  ReservationController.list
)

/**
 * @openapi
 * /reservations/{id}:
 *   get:
 *     summary: Busca uma reserva pelo ID
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da reserva
 *     responses:
 *       200:
 *         description: Reserva encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Reserva não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
ReservationRoutes.get(
  '/:id',
  (req, _res, next) => {
    // valida id por schema (opcional, já que é path param)
    ReservationIdParamSchema.parse({ id: req.params.id })
    next()
  },
  ReservationController.getById
)

/**
 * @openapi
 * /reservations:
 *   put:
 *     summary: Atualiza uma reserva
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateReservation'
 *     responses:
 *       200:
 *         description: Reserva atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Dados inválidos ou conflito de datas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Reserva ou quarto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
ReservationRoutes.put(
  '/',
  EnsureDataIsValidMiddleware(UpdateReservationSchema),
  ReservationController.update
)

/**
 * @openapi
 * /reservations/{id}:
 *   delete:
 *     summary: Remove uma reserva
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da reserva
 *     responses:
 *       204:
 *         description: Reserva removida com sucesso (sem conteúdo)
 *       404:
 *         description: Reserva não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
ReservationRoutes.delete(
  '/:id',
  (req, _res, next) => {
    ReservationIdParamSchema.parse({ id: req.params.id })
    next()
  },
  ReservationController.delete
)

export default ReservationRoutes
