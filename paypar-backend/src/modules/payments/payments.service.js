import { prisma } from '../../config/database.js';
import { wompiProvider } from './providers/wompi.provider.js';
import { logger } from '../../logger/logger.js';

export const paymentsService = {

  /**
   * Crea el registro de pago. Si el método requiere pasarela (CARD, NEQUI),
   * además construye los datos de checkout que el frontend necesita para
   * abrir el widget de Wompi. Si es CASH, se marca como completado de inmediato.
   */
  async create({ ticketId, userId, method }) {
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: { payment: true, vehicle: true },
    });

    if (!ticket) {
      const error = new Error('Ticket no encontrado');
      error.status = 404;
      throw error;
    }
    if (ticket.payment) {
      const error = new Error('Este ticket ya tiene un pago registrado');
      error.status = 409;
      throw error;
    }
    if (!ticket.finalAmount) {
      const error = new Error('El ticket debe cerrarse antes de pagar');
      error.status = 400;
      throw error;
    }

    const requiresGateway = ['CARD', 'NEQUI', 'DAVIPLATA'].includes(method);
    const amount = Number(ticket.finalAmount);

    const payment = await prisma.payment.create({
      data: {
        ticketId,
        userId,
        amount,
        currency: 'COP',
        method,
        provider: requiresGateway ? 'wompi' : null,
        status:   requiresGateway ? 'PENDING' : 'COMPLETED',
        paidAt:   requiresGateway ? null : new Date(),
      },
      include: { ticket: { include: { vehicle: true, parking: true } } },
    });

    let checkout = null;
    if (requiresGateway) {
      checkout = wompiProvider.buildCheckoutData({
        reference:     payment.id,
        amountInCOP:   amount,
        customerEmail: undefined,
      });
    }

    return { ...payment, checkout };
  },

  /**
   * Procesa el webhook que Wompi envía cuando una transacción cambia de estado.
   * Verifica la firma antes de confiar en el contenido.
   */
  async processWompiWebhook(eventBody) {
    const isValid = wompiProvider.verifyWebhookSignature(eventBody);
    if (!isValid) {
      logger.warn('Webhook de Wompi con firma inválida — ignorado');
      const error = new Error('Firma de webhook inválida');
      error.status = 401;
      throw error;
    }

    const transaction = eventBody.data?.transaction;
    if (!transaction) {
      const error = new Error('Webhook sin datos de transacción');
      error.status = 400;
      throw error;
    }

    const paymentId    = transaction.reference;
    const mappedStatus = wompiProvider.mapWompiStatus(transaction.status);

    const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
    if (!payment) {
      logger.warn('Webhook de Wompi para un pago inexistente', { paymentId });
      return null;
    }

    const updated = await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status:           mappedStatus,
        providerTxId:     transaction.id,
        providerResponse: transaction,
        paidAt:           mappedStatus === 'COMPLETED' ? new Date() : payment.paidAt,
      },
    });

    logger.info(`Pago ${paymentId} actualizado a ${mappedStatus} vía webhook Wompi`);
    return updated;
  },

  /**
   * Respaldo: si el frontend vuelve del checkout de Wompi y el webhook
   * aún no ha llegado, se puede consultar el estado directamente.
   */
  async syncPaymentStatus(paymentId) {
    const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
    if (!payment) {
      const error = new Error('Pago no encontrado');
      error.status = 404;
      throw error;
    }
    if (!payment.providerTxId) {
      return payment;
    }

    const transaction  = await wompiProvider.fetchTransactionStatus(payment.providerTxId);
    const mappedStatus = wompiProvider.mapWompiStatus(transaction.status);

    if (mappedStatus === payment.status) return payment;

    return prisma.payment.update({
      where: { id: paymentId },
      data: {
        status:           mappedStatus,
        providerResponse: transaction,
        paidAt:           mappedStatus === 'COMPLETED' ? new Date() : payment.paidAt,
      },
    });
  },

  async findByParking(parkingId, { startDate, endDate } = {}) {
    const where = { ticket: { parkingId }, status: 'COMPLETED' };
    if (startDate && endDate) {
      where.paidAt = { gte: new Date(startDate), lte: new Date(endDate) };
    }
    const payments = await prisma.payment.findMany({
      where,
      include: {
        ticket: { include: { vehicle: true } },
        user:   { select: { firstName: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    const total = payments.reduce((sum, p) => sum + Number(p.amount), 0);
    return { payments, total, count: payments.length };
  },
};
