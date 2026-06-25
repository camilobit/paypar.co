import { Router } from 'express';
import { zonesController } from './zones.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { requireRole } from '../../middlewares/role.middleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: BlueZones
 *   description: Gestión de zonas azules urbanas
 */

router.get('/', zonesController.findAll);
router.get('/:id', zonesController.findById);
router.post('/', authenticate, requireRole('ADMIN'), zonesController.create);

export default router;
