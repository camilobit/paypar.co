import { ticketsService } from './tickets.service.js';
import { response } from '../../utils/response.utils.js';

export const ticketsController = {
  async create(req, res, next) {
    try {
      const ticket = await ticketsService.create({ ...req.body, operatorId: req.user.id });
      return response.created(res, ticket, 'Ticket creado');
    } catch (error) { next(error); }
  },
  async findByPlate(req, res, next) {
    try {
      const ticket = await ticketsService.findByPlate(req.params.plate);
      return response.success(res, ticket);
    } catch (error) { next(error); }
  },
  async close(req, res, next) {
    try {
      const ticket = await ticketsService.close(req.params.id);
      return response.success(res, ticket, 'Ticket cerrado');
    } catch (error) { next(error); }
  },
  async findByParking(req, res, next) {
    try {
      const tickets = await ticketsService.findByParking(req.params.parkingId, req.query);
      return response.success(res, tickets);
    } catch (error) { next(error); }
  },
};
