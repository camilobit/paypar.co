import { verifyToken } from '../utils/jwt.utils.js';
import { prisma } from '../config/database.js';
import { response } from '../utils/response.utils.js';

export const authenticate = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer '))
      return response.unauthorized(res, 'Token no proporcionado');

    const token   = header.split(' ')[1];
    const decoded = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { role: true },
    });

    if (!user || !user.isActive)
      return response.unauthorized(res, 'Usuario no encontrado o inactivo');

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
