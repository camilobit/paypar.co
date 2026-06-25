import { authService } from './auth.service.js';
import { response } from '../../utils/response.utils.js';

export const authController = {
  async register(req, res, next) {
    try {
      const result = await authService.register(req.body);
      return response.created(res, result, 'Usuario registrado exitosamente');
    } catch (error) { next(error); }
  },

  async login(req, res, next) {
    try {
      const result = await authService.login(req.body);
      return response.success(res, result, 'Inicio de sesión exitoso');
    } catch (error) { next(error); }
  },

  async googleAuth(req, res, next) {
    try {
      const result = await authService.loginWithGoogle(req.body);
      return response.success(res, result, 'Autenticación con Google exitosa');
    } catch (error) { next(error); }
  },

  async getProfile(req, res, next) {
    try {
      const user = await authService.getProfile(req.user.id);
      return response.success(res, user);
    } catch (error) { next(error); }
  },
};
