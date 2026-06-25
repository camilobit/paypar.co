import { validationResult } from 'express-validator';
import { response } from '../utils/response.utils.js';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return response.error(res, 'Datos inválidos', 422, errors.array());
  next();
};
