import { prisma } from '../../config/database.js';

export const zonesService = {
  async create({ parkingId, zoneCode, maxDurationMinutes, enforcementStart, enforcementEnd }) {
    const parking = await prisma.parking.findUnique({ where: { id: parkingId } });
    if (!parking) { const e = new Error('Parqueadero no encontrado'); e.status = 404; throw e; }
    return prisma.blueZone.create({
      data: { parkingId, zoneCode, maxDurationMinutes, enforcementStart, enforcementEnd },
      include: { parking: { include: { city: true } } },
    });
  },
  async findAll() {
    return prisma.blueZone.findMany({
      where: { isActive: true },
      include: { parking: { include: { city: true } } },
      orderBy: { zoneCode: 'asc' },
    });
  },
  async findById(id) {
    const zone = await prisma.blueZone.findUnique({ where: { id }, include: { parking: { include: { city: true } } } });
    if (!zone) { const e = new Error('Zona azul no encontrada'); e.status = 404; throw e; }
    return zone;
  },
};
