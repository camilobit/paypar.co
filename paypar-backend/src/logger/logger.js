import winston from 'winston';
import { env } from '../config/env.js';

const { combine, timestamp, colorize, printf, json, errors } = winston.format;

export const logger = winston.createLogger({
  level: env.logLevel,
  format: env.isDev
    ? combine(
        colorize({ all: true }),
        timestamp({ format: 'HH:mm:ss' }),
        errors({ stack: true }),
        printf(({ timestamp, level, message, stack }) =>
          stack
            ? `[${timestamp}] ${level}: ${message}\n${stack}`
            : `[${timestamp}] ${level}: ${message}`
        )
      )
    : combine(timestamp(), errors({ stack: true }), json()),
  transports: [new winston.transports.Console()],
});
