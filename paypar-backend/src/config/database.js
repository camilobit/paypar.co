import { PrismaClient } from '@prisma/client';
import { logger } from '../logger/logger.js';
import { env } from './env.js';

const prisma = new PrismaClient({
  log: env.isDev ? ['warn', 'error'] : ['error'],
});

export const connectDatabase = async () => {
  try {
    await prisma.$connect();
    logger.info('✅ Base de datos conectada');
  } catch (error) {
    logger.error('❌ Error conectando base de datos', { error });
    process.exit(1);
  }
};

export const disconnectDatabase = async () => {
  await prisma.$disconnect();
};

export { prisma };
