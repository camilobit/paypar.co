import { env } from './env.js';

const allowedOrigins = env.isDev
  ? ['http://localhost:5173', 'http://localhost:4173', 'http://localhost:3000']
  : ['https://paypar.co', 'https://www.paypar.co'];

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origen no permitido → ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
