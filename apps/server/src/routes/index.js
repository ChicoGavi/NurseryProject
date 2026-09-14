import Router from 'express';
import authRouter from './auth.js';
import authToken from '../middlewares/authMiddleware.js';
import categoryRouter from './category.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/category', authToken, categoryRouter);

export default router;
