import { prisma } from '../../config/database.js';

export const parkingsService = {

  async create(data) {
    return prisma.parking.create({
      data,
      include: { city: true, operator: { select: { firstName: true, email: true } } },
    });
  },

  async findAll({ cityId, type, isActive = true } = {}) {
    const where = { isActive: isActive === 'false' ? false : true };
    if (cityId) where.cityId = cityId;
    if (type)   where.type   = type;
    return prisma.parking.findMany({
      where,
      include: {
        city:    true,
        blueZone: true,
        _count:  { select: { tickets: { where: { status: 'ACTIVE' } } } },
      },
      orderBy: { name: 'asc' },
    });
  },

  async findById(id) {
    const parking = await prisma.parking.findUnique({
      where: { id },
      include: { city: true, blueZone: true, operator: { select: { id: true, firstName: true, email: true } } },
    });
    if (!parking) { const e = new Error('Parqueadero no encontrado'); e.status = 404; throw e; }
    return parking;
  },

  async update(id, data) {
    return prisma.parking.update({ where: { id }, data, include: { city: true } });
  },

  async getDashboardStats(parkingId) {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const [activeTickets, todayTickets, todayRevenue, parking] = await Promise.all([
      prisma.ticket.count({ where: { parkingId, status: 'ACTIVE' } }),
      prisma.ticket.count({ where: { parkingId, entryTime: { gte: today } } }),
      prisma.payment.aggregate({
        where: { ticket: { parkingId }, status: 'COMPLETED', paidAt: { gte: today } },
        _sum: { amount: true },
      }),
      prisma.parking.findUnique({ where: { id: parkingId } }),
    ]);
    return {
      activeTickets,
      todayTickets,
      todayRevenue:    Number(todayRevenue._sum.amount) || 0,
      totalSpaces:     parking.totalSpaces,
      availableSpaces: parking.availableSpaces,
      occupancyRate:   Math.round(((parking.totalSpaces - parking.availableSpaces) / parking.totalSpaces) * 100),
    };
  },
};
