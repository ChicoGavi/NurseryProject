import {
  createCategoryService,
  getCategoryService,
  putCategoryService,
  deleteCategoryService,
} from '../services/categoryService.js';

export const createCategory = async (req, res) => {
  if (!req.user || req.user.role !== 1)
    res.status(403).json({ error: 'Access Denied!' });

  try {
    if (!req.body) res.status(400).json({ error: 'No data send.' });

    const { name, description } = req.body;

    const newCategory = await createCategoryService(name, description);

    if (newCategory) res.status(201).json('Created Successfully');
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

export const getCategory = async (req, res) => {
  if (!req.user || req.user.role !== 1)
    return res.status(403).json({ error: 'Error invalid user' });

  try {
    const getCategory = await getCategoryService();
    if (getCategory) return res.status(200).send(getCategory);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

export const putCategory = async (req, res) => {
  if (!req.user || req.user.role !== 1)
    return res.status(403).json({ error: 'Error invalid user' });

  try {
    const isNotValidObject =
      !req.body ||
      Object.keys(req.body).length === 0 ||
      Object.values(req.body).toString().trim().length === 0;

    if (isNotValidObject)
      return res.status(400).json({ error: 'Error no data' });

    const newCategory = await putCategoryService(req.params.id, req.body);

    if (!newCategory)
      return res.status(404).json({ message: 'Category not found' });

    return res.status(200).json(newCategory);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

export const deleteCategory = async (req, res) => {
  if (!req.user || req.user.role !== 1)
    return res.status(403).json({ error: 'Error invalid user' });
  try {
    await deleteCategoryService(req.params.id);
    return res.status(200).json({ message: 'Deleted Successfull' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
