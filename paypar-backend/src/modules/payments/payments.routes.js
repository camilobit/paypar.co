import { Router } from 'express';
import { paymentsController } from './payments.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { requireRole } from '../../middlewares/role.middleware.js';
import { body } from 'express-validator';
import { validate } from '../../middlewares/validate.middleware.js';

const router = Router();

const createValidator = [
  body('ticketId').isUUID().withMessage('ID de ticket inválido'),
  body('method')
    .isIn(['CARD', 'CASH', 'TRANSFER', 'NEQUI', 'DAVIPLATA'])
    .withMessage('Método de pago inválido'),
];

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Gestión de pagos e integración con Wompi
 */

/**
 * @swagger
 * /payments:
 *   post:
 *     tags: [Payments]
 *     summary: Registrar pago de ticket. Si el método requiere pasarela (CARD, NEQUI, DAVIPLATA), la respuesta incluye los datos de checkout para abrir el widget de Wompi en el frontend.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [ticketId, method]
 *             properties:
 *               ticketId: { type: string, format: uuid }
 *               method: { type: string, enum: [CARD, CASH, TRANSFER, NEQUI, DAVIPLATA] }
 */
router.post('/', authenticate, createValidator, validate, paymentsController.create);

/**
 * @swagger
 * /payments/webhook/wompi:
 *   post:
 *     tags: [Payments]
 *     summary: Webhook de eventos de Wompi (llamado por Wompi, no por el frontend)
 *     security: []
 */
router.post('/webhook/wompi', paymentsController.webhook);

/**
 * @swagger
 * /payments/{id}/sync:
 *   get:
 *     tags: [Payments]
 *     summary: Sincronizar el estado de un pago directamente con Wompi (respaldo si el webhook no llegó)
 */
router.get('/:id/sync', authenticate, paymentsController.syncStatus);

router.get('/parking/:parkingId', authenticate, requireRole('OPERATOR', 'ADMIN'), paymentsController.findByParking);

export default router;
