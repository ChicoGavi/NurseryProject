import Router from 'express';
import authToken from '../middlewares/authMiddleware.js';
import {
  createPlants,
  getPlants,
  updatePlants,
  deletePlants,
} from '../controllers/plantsController.js';

const router = Router();

router.post('/create', authToken, createPlants);
router.get('/', authToken, getPlants);
router.put('/:uuid', authToken, updatePlants);
router.delete('/:uuid', authToken, deletePlants);

export default router;
