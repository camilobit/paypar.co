import { Router } from 'express';
import { usersController } from './users.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { requireRole } from '../../middlewares/role.middleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestión de usuarios (solo ADMIN)
 */

router.get('/', authenticate, requireRole('ADMIN'), usersController.findAll);
router.get('/:id', authenticate, requireRole('ADMIN'), usersController.findById);
router.post('/operators', authenticate, requireRole('ADMIN'), usersController.createOperator);
router.patch('/:id/toggle', authenticate, requireRole('ADMIN'), usersController.toggleActive);

export default router;
