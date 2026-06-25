import { vehiclesService } from './vehicles.service.js';
import { response } from '../../utils/response.utils.js';

export const vehiclesController = {
  async create(req, res, next) {
    try {
      const vehicle = await vehiclesService.create({ ...req.body, ownerId: req.user.id });
      return response.created(res, vehicle, 'Vehículo registrado');
    } catch (error) { next(error); }
  },
  async getByPlate(req, res, next) {
    try {
      const vehicle = await vehiclesService.findByPlate(req.params.plate);
      return response.success(res, vehicle);
    } catch (error) { next(error); }
  },
  async getMyVehicles(req, res, next) {
    try {
      const vehicles = await vehiclesService.findByOwner(req.user.id);
      return response.success(res, vehicles);
    } catch (error) { next(error); }
  },
  async update(req, res, next) {
    try {
      const vehicle = await vehiclesService.update(req.params.id, req.body, req.user.id);
      return response.success(res, vehicle, 'Vehículo actualizado');
    } catch (error) { next(error); }
  },
  async remove(req, res, next) {
    try {
      await vehiclesService.remove(req.params.id, req.user.id);
      return response.success(res, null, 'Vehículo eliminado');
    } catch (error) { next(error); }
  },
};
