import Router from 'express';
import {
  createCategory,
  getCategory,
  putCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import authToken from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', authToken, createCategory);
router.get('/', authToken, getCategory);
router.put('/:id', authToken, putCategory);
router.delete('/:id', authToken, deleteCategory);

export default router;
