import { usersService } from './users.service.js';
import { response } from '../../utils/response.utils.js';

export const usersController = {
  async findAll(req, res, next) {
    try { return response.success(res, await usersService.findAll()); } catch (error) { next(error); }
  },
  async findById(req, res, next) {
    try { return response.success(res, await usersService.findById(req.params.id)); } catch (error) { next(error); }
  },
  async createOperator(req, res, next) {
    try { return response.created(res, await usersService.createOperator(req.body), 'Operador creado'); } catch (error) { next(error); }
  },
  async toggleActive(req, res, next) {
    try {
      const user = await usersService.toggleActive(req.params.id);
      return response.success(res, user, `Usuario ${user.isActive ? 'activado' : 'desactivado'}`);
    } catch (error) { next(error); }
  },
};
