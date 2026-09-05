import Router from 'express';
import { register, login } from '../controllers/authController.js';
import authToken from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/protected-route', authToken, (req, res) => {
  res.status(200).json({ message: 'Welcome men!' });
});

export default router;
