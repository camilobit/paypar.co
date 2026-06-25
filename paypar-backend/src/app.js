import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import rateLimit from 'express-rate-limit';

import { corsOptions }                    from './config/cors.js';
import { swaggerSpec }                    from './config/swagger.js';
import { errorHandler, notFoundHandler }  from './middlewares/errorHandler.js';
import { logger }                         from './logger/logger.js';
import { env }                            from './config/env.js';

import authRoutes     from './modules/auth/auth.routes.js';
import usersRoutes    from './modules/users/users.routes.js';
import vehiclesRoutes from './modules/vehicles/vehicles.routes.js';
import parkingsRoutes from './modules/parkings/parkings.routes.js';
import ticketsRoutes  from './modules/tickets/tickets.routes.js';
import paymentsRoutes from './modules/payments/payments.routes.js';
import zonesRoutes    from './modules/zones/zones.routes.js';
import auditRoutes    from './modules/audit/audit.routes.js';

const app = express();

// ── Seguridad ──────────────────────────────────────────
app.use(helmet());
app.use(cors(corsOptions));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Demasiadas peticiones. Intenta en 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
}));

// ── Parsing ────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Logging ────────────────────────────────────────────
app.use(morgan('combined', { stream: { write: (msg) => logger.http(msg.trim()) } }));

// ── Health check ───────────────────────────────────────
app.get('/health', (_, res) => res.json({
  success: true,
  message: 'PAYPAR API online',
  version: '1.0.0',
  timestamp: new Date().toISOString(),
}));

// ── Documentación ──────────────────────────────────────
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'PAYPAR API',
  customCss: '.swagger-ui .topbar { background-color: #10b981; }',
}));

// ── Rutas ──────────────────────────────────────────────
const API = '/api/v1';
app.use(`${API}/auth`,     authRoutes);
app.use(`${API}/users`,    usersRoutes);
app.use(`${API}/vehicles`, vehiclesRoutes);
app.use(`${API}/parkings`, parkingsRoutes);
app.use(`${API}/tickets`,  ticketsRoutes);
app.use(`${API}/payments`, paymentsRoutes);
app.use(`${API}/zones`,    zonesRoutes);
app.use(`${API}/audit`,    auditRoutes);

// ── Error handlers ─────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
