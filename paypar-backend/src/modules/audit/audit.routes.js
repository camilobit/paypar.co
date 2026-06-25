import { Router } from 'express';
import { auditController } from './audit.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { requireRole } from '../../middlewares/role.middleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Audit
 *   description: Logs de auditoría (solo ADMIN)
 */

router.get('/', authenticate, requireRole('ADMIN'), auditController.findAll);

export default router;
