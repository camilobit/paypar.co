import { prisma } from '../../config/database.js';
import { hashPassword } from '../../utils/hash.utils.js';

export const usersService = {
  async findAll() {
    return prisma.user.findMany({
      select: { id: true, email: true, firstName: true, lastName: true, phone: true, isActive: true, createdAt: true, role: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  },
  async findById(id) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, firstName: true, lastName: true, phone: true, avatarUrl: true, isActive: true, emailVerified: true, createdAt: true, role: { select: { name: true } } },
    });
    if (!user) { const e = new Error('Usuario no encontrado'); e.status = 404; throw e; }
    return user;
  },
  async createOperator({ email, password, firstName, lastName, phone }) {
    const operatorRole = await prisma.role.findUnique({ where: { name: 'OPERATOR' } });
    const passwordHash = await hashPassword(password);
    return prisma.user.create({
      data: { email, passwordHash, firstName, lastName, phone, roleId: operatorRole.id },
      select: { id: true, email: true, firstName: true, lastName: true, role: true },
    });
  },
  async toggleActive(id) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) { const e = new Error('Usuario no encontrado'); e.status = 404; throw e; }
    return prisma.user.update({ where: { id }, data: { isActive: !user.isActive }, select: { id: true, email: true, isActive: true } });
  },
};
