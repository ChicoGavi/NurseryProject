import {
  createPlantService,
  getPlantsService,
  updatePlantsService,
  deletePlantsService,
} from '../services/plantService.js';

export const createPlants = async (req, res) => {
  try {
    if (req.user.role !== 1)
      return res.status(403).json({ error: 'No valid user' });
    if (!req.body || Object.keys(req.body).length === 0)
      return res.status(400).json({ error: 'No fields body detected' });
    const { name, scientificName, price, stock, imageUrl, categoryId } =
      req.body;

    const plantCreate = await createPlantService(
      name,
      scientificName,
      parseInt(price),
      parseInt(stock),
      imageUrl,
      parseInt(categoryId),
      req.user.id
    );

    return res.status(201).send(plantCreate);
  } catch (e) {
    res.status(500).json({ error: 'Failed created Plants' + e.message });
  }
};

export const getPlants = async (req, res) => {
  try {
    const plants = await getPlantsService();
    return res.status(200).send(plants);
  } catch (error) {
    res.status(500).json({ error: 'Failed getting Plants' + error.message });
  }
};

export const updatePlants = async (req, res) => {
  try {
    if (req.user.role !== 1)
      return res.status(403).json({ error: 'No valid user' });
    if (!req.body || Object.keys(req.body).length === 0)
      return res.status(400).json({ error: 'No fields body detected' });

    const { uuid } = req.params;

    const updatePlants = await updatePlantsService(uuid, req.body);

    return res.status(200).send(updatePlants);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const deletePlants = async (req, res) => {
  try {
    if (req.user.role !== 1)
      return res.status(403).json({ error: 'No valid user' });
    const { uuid } = req.params;
    const deleteItem = await deletePlantsService(uuid);

    return res.status(200).send(deleteItem);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
