import bcrypt from 'bcryptjs';
import pkg from '@prisma/client';
import jwt from 'jsonwebtoken';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const registerService = async (email, password, fullName) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const id = crypto.randomUUID();

  const newUser = await prisma.user.create({
    data: {
      id,
      email,
      password_hash: hashedPassword,
      full_name: fullName,
      role_id: 2,
    },
  });

  return newUser;
};

export const loginService = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error('Password or email are invalid!');

  const validPassword = await bcrypt.compare(password, user.password_hash);

  if (!validPassword) throw new Error('Password or email are invalid!');

  const token = jwt.sign(
    { id: user.id, role: user.role_id },
    process.env.JWT_SECRET,
    { expiresIn: '3h' }
  );

  return token;
};
