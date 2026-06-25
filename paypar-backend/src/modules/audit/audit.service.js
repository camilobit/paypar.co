import { prisma } from '../../config/database.js';

export const auditService = {
  async findAll({ userId, entityType, startDate, endDate, limit = 50 } = {}) {
    const where = {};
    if (userId)     where.userId     = userId;
    if (entityType) where.entityType = entityType;
    if (startDate && endDate) {
      where.createdAt = { gte: new Date(startDate), lte: new Date(endDate) };
    }
    return prisma.auditLog.findMany({
      where,
      include: { user: { select: { firstName: true, email: true } } },
      orderBy: { createdAt: 'desc' },
      take: Number(limit),
    });
  },
};
