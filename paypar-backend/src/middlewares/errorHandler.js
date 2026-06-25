import { logger } from '../logger/logger.js';
import { env } from '../config/env.js';

export const errorHandler = (err, req, res, next) => {
  logger.error(`${req.method} ${req.path} → ${err.message}`, { stack: err.stack });

  if (err.message?.startsWith('CORS:'))
    return res.status(403).json({ success: false, message: err.message });

  if (err.code === 'P2025')
    return res.status(404).json({ success: false, message: 'Recurso no encontrado' });

  if (err.code === 'P2002') {
    const field = err.meta?.target?.[0] || 'campo';
    return res.status(409).json({ success: false, message: `Ya existe un registro con ese ${field}` });
  }

  if (err.name === 'JsonWebTokenError')
    return res.status(401).json({ success: false, message: 'Token inválido' });

  if (err.name === 'TokenExpiredError')
    return res.status(401).json({ success: false, message: 'Token expirado' });

  const status = err.status || err.statusCode || 500;
  return res.status(status).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    ...(env.isDev && { stack: err.stack }),
  });
};

export const notFoundHandler = (req, res) =>
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.method} ${req.path}`,
  });
