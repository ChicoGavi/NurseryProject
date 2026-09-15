import Router from 'express';
import authRouter from './auth.js';
import authToken from '../middlewares/authMiddleware.js';
import categoryRouter from './category.js';
import plantsRouter from './plants.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/category', authToken, categoryRouter);
router.use('/plants', authToken, plantsRouter);

export default router;
