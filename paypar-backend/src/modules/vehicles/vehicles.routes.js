import { Router } from 'express';
import { vehiclesController } from './vehicles.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { body } from 'express-validator';
import { validate } from '../../middlewares/validate.middleware.js';

const router = Router();

const createValidator = [
  body('licensePlate').trim().notEmpty().withMessage('Placa requerida'),
  body('type').isIn(['CAR','MOTORCYCLE','TRUCK','VAN']).withMessage('Tipo inválido'),
];

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: Gestión de vehículos
 */

/**
 * @swagger
 * /vehicles:
 *   post:
 *     tags: [Vehicles]
 *     summary: Registrar vehículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [licensePlate, type]
 *             properties:
 *               licensePlate: { type: string, example: ABC123 }
 *               type: { type: string, enum: [CAR, MOTORCYCLE, TRUCK, VAN] }
 *               brand: { type: string, example: Chevrolet }
 *               model: { type: string, example: Spark }
 *               color: { type: string, example: Rojo }
 */
router.post('/', authenticate, createValidator, validate, vehiclesController.create);
router.get('/', authenticate, vehiclesController.getMyVehicles);
router.get('/plate/:plate', vehiclesController.getByPlate);
router.put('/:id', authenticate, vehiclesController.update);
router.delete('/:id', authenticate, vehiclesController.remove);

export default router;
