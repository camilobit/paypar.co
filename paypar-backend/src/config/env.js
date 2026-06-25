import dotenv from 'dotenv';
dotenv.config();

const required = ['DATABASE_URL', 'JWT_SECRET', 'FRONTEND_URL'];

for (const variable of required) {
  if (!process.env[variable]) {
    console.error(`❌ Variable de entorno faltante: ${variable}`);
    console.error(`   Revisa tu archivo .env`);
    process.exit(1);
  }
}

export const env = {
  port:        process.env.PORT || 4000,
  nodeEnv:     process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL,
  jwt: {
    secret:    process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  frontendUrl: process.env.FRONTEND_URL,
  logLevel:    process.env.LOG_LEVEL || 'info',
  isDev:       process.env.NODE_ENV !== 'production',
  isProd:      process.env.NODE_ENV === 'production',
  google: {
    clientId:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  wompi: {
    publicKey:    process.env.WOMPI_PUBLIC_KEY,
    privateKey:   process.env.WOMPI_PRIVATE_KEY,
    eventsSecret: process.env.WOMPI_EVENTS_SECRET,
  },
};
