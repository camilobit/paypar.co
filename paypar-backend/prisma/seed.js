import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Ejecutando seed...');

  const roles = await Promise.all([
    prisma.role.upsert({
      where: { name: 'CLIENT' },
      update: {},
      create: { name: 'CLIENT', description: 'Conductor — usuario final' },
    }),
    prisma.role.upsert({
      where: { name: 'OPERATOR' },
      update: {},
      create: { name: 'OPERATOR', description: 'Operador de parqueadero' },
    }),
    prisma.role.upsert({
      where: { name: 'ADMIN' },
      update: {},
      create: { name: 'ADMIN', description: 'Administrador del sistema' },
    }),
  ]);

  console.log('✅ Roles creados');

  const city = await prisma.city.upsert({
    where: { id: 'city-villavicencio' },
    update: {},
    create: {
      id: 'city-villavicencio',
      name: 'Villavicencio',
      department: 'Meta',
    },
  });

  console.log('✅ Ciudad creada:', city.name);

  const adminRole = roles.find(r => r.name === 'ADMIN');
  const passwordHash = await bcrypt.hash('Admin2026**', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@paypar.co' },
    update: {},
    create: {
      email: 'admin@paypar.co',
      passwordHash,
      firstName: 'Admin',
      lastName: 'PAYPAR',
      roleId: adminRole.id,
      isActive: true,
      emailVerified: true,
    },
  });

  console.log('✅ Admin creado:', admin.email);
  console.log('🔑 Contraseña inicial: Admin2026**  ← Cámbiala inmediatamente');
  console.log('🌱 Seed completado');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
