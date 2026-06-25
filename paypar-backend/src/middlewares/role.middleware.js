import { response } from '../utils/response.utils.js';

export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) return response.unauthorized(res);
  if (!roles.includes(req.user.role.name))
    return response.forbidden(res, `Se requiere rol: ${roles.join(' o ')}`);
  next();
};
