import { paymentsService } from './payments.service.js';
import { response } from '../../utils/response.utils.js';

export const paymentsController = {
  async create(req, res, next) {
    try {
      const payment = await paymentsService.create({
        ...req.body,
        userId: req.user?.id,
      });
      return response.created(res, payment, 'Pago registrado');
    } catch (error) { next(error); }
  },

  async webhook(req, res, next) {
    try {
      await paymentsService.processWompiWebhook(req.body);
      // Wompi espera un 200 simple para confirmar recepción
      return res.status(200).json({ received: true });
    } catch (error) { next(error); }
  },

  async syncStatus(req, res, next) {
    try {
      const payment = await paymentsService.syncPaymentStatus(req.params.id);
      return response.success(res, payment);
    } catch (error) { next(error); }
  },

  async findByParking(req, res, next) {
    try {
      const result = await paymentsService.findByParking(req.params.parkingId, req.query);
      return response.success(res, result);
    } catch (error) { next(error); }
  },
};
