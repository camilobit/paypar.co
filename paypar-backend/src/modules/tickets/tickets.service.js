import { prisma } from '../../config/database.js';
import { normalizePlate } from '../../utils/plate.utils.js';
import { calculateDurationMinutes, calculateAmount, generateTicketNumber } from '../../utils/ticket.utils.js';

export const ticketsService = {

  async create({ licensePlate, parkingId, operatorId, notes }) {
    const plate = normalizePlate(licensePlate);

    let vehicle = await prisma.vehicle.findUnique({ where: { licensePlate: plate } });
    if (!vehicle) {
      vehicle = await prisma.vehicle.create({ data: { licensePlate: plate, type: 'CAR' } });
    }

    const activeTicket = await prisma.ticket.findFirst({ where: { vehicleId: vehicle.id, status: 'ACTIVE' } });
    if (activeTicket) {
      const error = new Error('Este vehículo ya tiene un ticket activo');
      error.status = 409;
      throw error;
    }

    const parking = await prisma.parking.findUnique({ where: { id: parkingId } });
    if (!parking || !parking.isActive) {
      const error = new Error('Parqueadero no encontrado o inactivo');
      error.status = 404;
      throw error;
    }

    await prisma.parking.update({ where: { id: parkingId }, data: { availableSpaces: { decrement: 1 } } });

    return prisma.ticket.create({
      data: { ticketNumber: generateTicketNumber(), vehicleId: vehicle.id, parkingId, operatorId, entryTime: new Date(), notes },
      include: { vehicle: true, parking: { include: { city: true } } },
    });
  },

  async findByPlate(licensePlate) {
    const plate = normalizePlate(licensePlate);
    const ticket = await prisma.ticket.findFirst({
      where: { vehicle: { licensePlate: plate }, status: 'ACTIVE' },
      include: { vehicle: true, parking: true },
      orderBy: { createdAt: 'desc' },
    });

    if (!ticket) {
      const error = new Error('No hay ticket activo para esta placa');
      error.status = 404;
      throw error;
    }

    const durationMinutes = calculateDurationMinutes(ticket.entryTime);
    const baseAmount      = calculateAmount(durationMinutes, ticket.parking.hourlyRate);
    return { ...ticket, durationMinutes, baseAmount };
  },

  async close(ticketId) {
    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId }, include: { parking: true } });
    if (!ticket) { const e = new Error('Ticket no encontrado'); e.status = 404; throw e; }
    if (ticket.status !== 'ACTIVE') { const e = new Error('El ticket no está activo'); e.status = 409; throw e; }

    const exitTime        = new Date();
    const durationMinutes = calculateDurationMinutes(ticket.entryTime, exitTime);
    const baseAmount      = calculateAmount(durationMinutes, ticket.parking.hourlyRate);
    const finalAmount     = Math.max(baseAmount - Number(ticket.discountAmount), 0);

    const [updatedTicket] = await prisma.$transaction([
      prisma.ticket.update({
        where: { id: ticketId },
        data: { exitTime, durationMinutes, baseAmount, finalAmount, status: 'PAID' },
        include: { vehicle: true, parking: true, payment: true },
      }),
      prisma.parking.update({ where: { id: ticket.parkingId }, data: { availableSpaces: { increment: 1 } } }),
    ]);

    return updatedTicket;
  },

  async findByParking(parkingId, { status, date } = {}) {
    const where = { parkingId };
    if (status) where.status = status;
    if (date) {
      const start = new Date(date); start.setHours(0, 0, 0, 0);
      const end   = new Date(date); end.setHours(23, 59, 59, 999);
      where.entryTime = { gte: start, lte: end };
    }
    return prisma.ticket.findMany({
      where,
      include: { vehicle: true, payment: true },
      orderBy: { entryTime: 'desc' },
    });
  },
};
