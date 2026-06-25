import { prisma } from '../../config/database.js';
import { hashPassword, comparePassword } from '../../utils/hash.utils.js';
import { generateToken } from '../../utils/jwt.utils.js';
import { OAuth2Client } from 'google-auth-library';
import { env } from '../../config/env.js';

const googleClient = new OAuth2Client(env.google.clientId);

const formatUser = (user) => ({
  id:        user.id,
  email:     user.email,
  firstName: user.firstName,
  lastName:  user.lastName,
  phone:     user.phone,
  avatarUrl: user.avatarUrl,
  role:      user.role.name,
});

export const authService = {

  async register({ email, password, firstName, lastName, phone }) {
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      const error = new Error('El correo ya está registrado');
      error.status = 409;
      throw error;
    }

    const clientRole   = await prisma.role.findUnique({ where: { name: 'CLIENT' } });
    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: { email, passwordHash, firstName, lastName, phone, roleId: clientRole.id },
      include: { role: true },
    });

    const token = generateToken({ userId: user.id, role: user.role.name });
    return { token, user: formatUser(user) };
  },

  async login({ email, password }) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user || !user.passwordHash) {
      const error = new Error('Credenciales inválidas');
      error.status = 401;
      throw error;
    }

    const valid = await comparePassword(password, user.passwordHash);
    if (!valid) {
      const error = new Error('Credenciales inválidas');
      error.status = 401;
      throw error;
    }

    if (!user.isActive) {
      const error = new Error('Cuenta desactivada');
      error.status = 403;
      throw error;
    }

    const token = generateToken({ userId: user.id, role: user.role.name });
    return { token, user: formatUser(user) };
  },

  async loginWithGoogle({ idToken }) {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: env.google.clientId,
    });

    const {
      sub: googleId,
      email,
      given_name: firstName,
      family_name: lastName,
      picture: avatarUrl,
    } = ticket.getPayload();

    let user = await prisma.user.findFirst({
      where: { OR: [{ googleId }, { email }] },
      include: { role: true },
    });

    if (!user) {
      const clientRole = await prisma.role.findUnique({ where: { name: 'CLIENT' } });
      user = await prisma.user.create({
        data: {
          email, googleId, firstName, lastName: lastName || '',
          avatarUrl, roleId: clientRole.id, emailVerified: true,
        },
        include: { role: true },
      });
    } else if (!user.googleId) {
      user = await prisma.user.update({
        where: { id: user.id },
        data:  { googleId, avatarUrl },
        include: { role: true },
      });
    }

    const token = generateToken({ userId: user.id, role: user.role.name });
    return { token, user: formatUser(user) };
  },

  async getProfile(userId) {
    const user = await prisma.user.findUnique({
      where:   { id: userId },
      include: { role: true },
    });
    if (!user) {
      const error = new Error('Usuario no encontrado');
      error.status = 404;
      throw error;
    }
    return formatUser(user);
  },
};
