import bcrypt from 'bcryptjs';
import pkg from '@prisma/client';

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
