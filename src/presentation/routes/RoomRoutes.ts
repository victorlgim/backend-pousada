import { Router } from 'express'
import RoomController from '../controllers/RoomController'
// import AuthMiddleware from '../middlewares/AuthMiddleware'  // ⛔️ removido
import { EnsureDataIsValidMiddleware } from '../middlewares/EnsureDataIsValidMiddleware'
import { CreateRoomSchema, UpdateRoomSchema, IdParamSchema } from '../../schemas/room/RoomSchema'

const RoomRoutes = Router()

// ⛔️ Sem JWT/roles
// RoomRoutes.use(AuthMiddleware.verifyToken)
// RoomRoutes.use(AuthMiddleware.permit('admin', 'supervisor'))

/**
 * @openapi
 * /rooms:
 *   post:
 *     summary: Cadastra um novo quarto
 *     tags: [Quartos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRoom'
 *           examples:
 *             exemplo:
 *               value:
 *                 number: "101"
 *                 capacity: 2
 *                 pricePerNight: 220
 *                 category: "Luxo"
 *     responses:
 *       201:
 *         description: Quarto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomResponse'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
RoomRoutes.post('/', EnsureDataIsValidMiddleware(CreateRoomSchema), RoomController.create)

/**
 * @openapi
 * /rooms:
 *   get:
 *     summary: Lista todos os quartos cadastrados
 *     tags: [Quartos]
 *     responses:
 *       200:
 *         description: Lista de quartos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RoomResponse'
 */
RoomRoutes.get('/', RoomController.list)

/**
 * @openapi
 * /rooms/{id}:
 *   get:
 *     summary: Retorna os dados de um quarto pelo ID
 *     tags: [Quartos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Quarto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomResponse'
 *       404:
 *         description: Quarto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
RoomRoutes.get('/:id', EnsureDataIsValidMiddleware(IdParamSchema), RoomController.getById)

/**
 * @openapi
 * /rooms/{id}:
 *   put:
 *     summary: Atualiza os dados de um quarto
 *     tags: [Quartos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRoom'
 *           examples:
 *             exemplo:
 *               value:
 *                 number: "202"
 *                 capacity: 4
 *                 pricePerNight: 350
 *                 category: "Standard"
 *     responses:
 *       200:
 *         description: Quarto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomResponse'
 *       404:
 *         description: Quarto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
RoomRoutes.put('/:id', EnsureDataIsValidMiddleware(UpdateRoomSchema), RoomController.update)

/**
 * @openapi
 * /rooms/{id}:
 *   delete:
 *     summary: Remove um quarto pelo ID
 *     tags: [Quartos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Quarto removido com sucesso
 *       404:
 *         description: Quarto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
RoomRoutes.delete('/:id', EnsureDataIsValidMiddleware(IdParamSchema), RoomController.delete)

export default RoomRoutes
