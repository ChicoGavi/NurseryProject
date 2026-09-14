import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export const createCategoryService = async (
  categoryName,
  categoryDescription
) => {
  const newCategory = await prisma.category.create({
    data: {
      name: categoryName,
      description: categoryDescription,
    },
  });

  return newCategory;
};

export const getCategoryService = async () => {
  return prisma.category.findMany();
};

export const putCategoryService = async (id, body) => {
  const conflict = await prisma.category.findFirst({
    where: {
      name: body.name,
      description: body.description,
      id: { not: parseInt(id, 10) },
    },
  });

  if (conflict) throw new Error('Exists duplicate.');

  return await prisma.category.update({
    where: { id: parseInt(id, 10) },
    data: body,
  });
};

export const deleteCategoryService = async (id) => {
  return await prisma.category.delete({
    where: {
      id: parseInt(id, 10),
    },
  });
};
