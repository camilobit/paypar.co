import { prisma } from '../../config/database.js';
import { normalizePlate, isValidColombianPlate } from '../../utils/plate.utils.js';

export const vehiclesService = {

  async create({ licensePlate, type, brand, model, color, ownerId }) {
    const plate = normalizePlate(licensePlate);
    if (!isValidColombianPlate(plate)) {
      const error = new Error('Formato de placa colombiana inválido');
      error.status = 422;
      throw error;
    }
    return prisma.vehicle.create({
      data: { licensePlate: plate, type, brand, model, color, ownerId },
      include: { owner: { select: { id: true, firstName: true, email: true } } },
    });
  },

  async findByPlate(licensePlate) {
    const plate = normalizePlate(licensePlate);
    const vehicle = await prisma.vehicle.findUnique({
      where: { licensePlate: plate },
      include: {
        tickets: {
          where: { status: 'ACTIVE' },
          include: { parking: true },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });
    if (!vehicle) {
      const error = new Error('Vehículo no encontrado');
      error.status = 404;
      throw error;
    }
    return vehicle;
  },

  async findByOwner(ownerId) {
    return prisma.vehicle.findMany({
      where: { ownerId },
      include: { tickets: { where: { status: 'ACTIVE' }, take: 1 } },
      orderBy: { createdAt: 'desc' },
    });
  },

  async update(id, data, ownerId) {
    const vehicle = await prisma.vehicle.findUnique({ where: { id } });
    if (!vehicle) { const e = new Error('Vehículo no encontrado'); e.status = 404; throw e; }
    if (vehicle.ownerId !== ownerId) { const e = new Error('Sin permisos'); e.status = 403; throw e; }
    return prisma.vehicle.update({ where: { id }, data });
  },

  async remove(id, ownerId) {
    const vehicle = await prisma.vehicle.findUnique({ where: { id } });
    if (!vehicle) { const e = new Error('Vehículo no encontrado'); e.status = 404; throw e; }
    if (vehicle.ownerId !== ownerId) { const e = new Error('Sin permisos'); e.status = 403; throw e; }
    return prisma.vehicle.delete({ where: { id } });
  },
};
