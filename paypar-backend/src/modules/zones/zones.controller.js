import { zonesService } from './zones.service.js';
import { response } from '../../utils/response.utils.js';

export const zonesController = {
  async create(req, res, next) {
    try {
      const zone = await zonesService.create(req.body);
      return response.created(res, zone, 'Zona azul creada');
    } catch (error) { next(error); }
  },
  async findAll(req, res, next) {
    try {
      const zones = await zonesService.findAll();
      return response.success(res, zones);
    } catch (error) { next(error); }
  },
  async findById(req, res, next) {
    try {
      const zone = await zonesService.findById(req.params.id);
      return response.success(res, zone);
    } catch (error) { next(error); }
  },
};
