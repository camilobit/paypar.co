import app from './src/app.js';
import { env } from './src/config/env.js';
import { connectDatabase, disconnectDatabase } from './src/config/database.js';
import { logger } from './src/logger/logger.js';

const start = async () => {
  await connectDatabase();

  const server = app.listen(env.port, () => {
    logger.info(`🚀 PAYPAR API  →  http://localhost:${env.port}`);
    logger.info(`📖 Swagger     →  http://localhost:${env.port}/api/docs`);
    logger.info(`🌍 Entorno     →  ${env.nodeEnv}`);
  });

  const shutdown = async (signal) => {
    logger.info(`${signal} — cerrando servidor...`);
    server.close(async () => {
      await disconnectDatabase();
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT',  () => shutdown('SIGINT'));
};

start();
