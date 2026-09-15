import pkg from '@prisma/client';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const createPlantService = async (
  name,
  scientificName,
  price,
  stock,
  imageUrl,
  categoryId,
  userID
) => {
  const id = crypto.randomUUID();

  const createUser = prisma.plant.create({
    data: {
      id,
      common_name: name,
      scientific_name: scientificName,
      price,
      stock,
      image_url: imageUrl,
      category_id: categoryId,
      created_by: userID,
    },
  });

  return createUser;
};

export const getPlantsService = async () => {
  return await prisma.plant.findMany({
    include: {
      category: true,
      creator: true,
    },
  });
};

export const updatePlantsService = async (id, data) => {
  return await prisma.plant.update({ where: { id }, data: data });
};

export const deletePlantsService = async (id) => {
  return await prisma.plant.delete({ where: { id } });
};
