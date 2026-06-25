export const response = {
  success: (res, data = null, message = 'OK', statusCode = 200) =>
    res.status(statusCode).json({ success: true, message, data }),

  created: (res, data = null, message = 'Creado exitosamente') =>
    res.status(201).json({ success: true, message, data }),

  error: (res, message = 'Error interno', statusCode = 500, errors = null) =>
    res.status(statusCode).json({
      success: false,
      message,
      ...(errors && { errors }),
    }),

  unauthorized: (res, message = 'No autenticado') =>
    res.status(401).json({ success: false, message }),

  forbidden: (res, message = 'Sin permisos suficientes') =>
    res.status(403).json({ success: false, message }),

  notFound: (res, message = 'Recurso no encontrado') =>
    res.status(404).json({ success: false, message }),
};
