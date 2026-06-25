import { auditService } from './audit.service.js';
import { response } from '../../utils/response.utils.js';

export const auditController = {
  async findAll(req, res, next) {
    try { return response.success(res, await auditService.findAll(req.query)); } catch (error) { next(error); }
  },
};
