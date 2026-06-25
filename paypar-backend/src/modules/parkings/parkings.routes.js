import { Router } from 'express';
import { parkingsController } from './parkings.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { requireRole } from '../../middlewares/role.middleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Parkings
 *   description: Gestión de parqueaderos
 */

router.get('/', parkingsController.findAll);
router.get('/:id', parkingsController.findById);
router.get('/:id/stats', authenticate, requireRole('OPERATOR','ADMIN'), parkingsController.getDashboardStats);
router.post('/', authenticate, requireRole('ADMIN'), parkingsController.create);
router.put('/:id', authenticate, requireRole('ADMIN'), parkingsController.update);

export default router;
