import { body } from 'express-validator';

export const registerValidator = [
  body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
  body('password')
    .isLength({ min: 8 }).withMessage('Mínimo 8 caracteres')
    .matches(/^(?=.*[A-Z])(?=.*[0-9])/).withMessage('Debe tener al menos una mayúscula y un número'),
  body('firstName').trim().notEmpty().withMessage('Nombre requerido'),
  body('lastName').trim().notEmpty().withMessage('Apellido requerido'),
  body('phone').optional().isMobilePhone('es-CO').withMessage('Teléfono inválido'),
];

export const loginValidator = [
  body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('Contraseña requerida'),
];

export const googleAuthValidator = [
  body('idToken').notEmpty().withMessage('Token de Google requerido'),
];
