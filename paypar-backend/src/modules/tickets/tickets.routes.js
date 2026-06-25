import { Router } from 'express';
import { ticketsController } from './tickets.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { requireRole } from '../../middlewares/role.middleware.js';
import { body } from 'express-validator';
import { validate } from '../../middlewares/validate.middleware.js';

const router = Router();

const createValidator = [
  body('licensePlate').trim().notEmpty().withMessage('Placa requerida'),
  body('parkingId').isUUID().withMessage('ID de parqueadero inválido'),
];

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: Gestión de tickets de parqueadero
 */

/**
 * @swagger
 * /tickets:
 *   post:
 *     tags: [Tickets]
 *     summary: Crear ticket de entrada (solo OPERATOR/ADMIN)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [licensePlate, parkingId]
 *             properties:
 *               licensePlate: { type: string, example: ABC123 }
 *               parkingId:    { type: string, format: uuid }
 *               notes:        { type: string }
 */
router.post('/', authenticate, requireRole('OPERATOR','ADMIN'), createValidator, validate, ticketsController.create);

/**
 * @swagger
 * /tickets/plate/{plate}:
 *   get:
 *     tags: [Tickets]
 *     summary: Buscar ticket activo por placa (público)
 *     security: []
 *     parameters:
 *       - in: path
 *         name: plate
 *         required: true
 *         schema: { type: string, example: ABC123 }
 */
router.get('/plate/:plate', ticketsController.findByPlate);

router.patch('/:id/close', authenticate, requireRole('OPERATOR','ADMIN'), ticketsController.close);
router.get('/parking/:parkingId', authenticate, requireRole('OPERATOR','ADMIN'), ticketsController.findByParking);

export default router;
