import { prisma } from '../config/database.js';
import { logger } from '../logger/logger.js';

export const auditAction = (action, entityType) => async (req, res, next) => {
  const originalJson = res.json.bind(res);

  res.json = async (body) => {
    if (body?.success && req.user) {
      try {
        await prisma.auditLog.create({
          data: {
            userId:     req.user.id,
            action,
            entityType,
            entityId:   body?.data?.id || req.params?.id || null,
            newValues:  req.body || null,
            ipAddress:  req.ip,
            userAgent:  req.headers['user-agent'],
          },
        });
      } catch (e) {
        logger.warn('Error guardando audit log', { error: e.message });
      }
    }
    return originalJson(body);
  };

  next();
};
