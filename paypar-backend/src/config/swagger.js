import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './env.js';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PAYPAR API',
      version: '1.0.0',
      description: 'API REST para gestión de parqueaderos y zonas azules en Colombia',
    },
    servers: [
      {
        url: env.isDev
          ? `http://localhost:${env.port}/api/v1`
          : 'https://api.paypar.co/api/v1',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/modules/**/*.routes.js'],
});
