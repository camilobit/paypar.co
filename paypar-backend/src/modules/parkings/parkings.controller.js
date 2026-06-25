import { parkingsService } from './parkings.service.js';
import { response } from '../../utils/response.utils.js';

export const parkingsController = {
  async create(req, res, next) {
    try {
      const parking = await parkingsService.create(req.body);
      return response.created(res, parking, 'Parqueadero creado');
    } catch (error) { next(error); }
  },
  async findAll(req, res, next) {
    try {
      const parkings = await parkingsService.findAll(req.query);
      return response.success(res, parkings);
    } catch (error) { next(error); }
  },
  async findById(req, res, next) {
    try {
      const parking = await parkingsService.findById(req.params.id);
      return response.success(res, parking);
    } catch (error) { next(error); }
  },
  async update(req, res, next) {
    try {
      const parking = await parkingsService.update(req.params.id, req.body);
      return response.success(res, parking, 'Parqueadero actualizado');
    } catch (error) { next(error); }
  },
  async getDashboardStats(req, res, next) {
    try {
      const stats = await parkingsService.getDashboardStats(req.params.id);
      return response.success(res, stats);
    } catch (error) { next(error); }
  },
};
