import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export default function authToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Must have a token code' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ err: 'invalid Token' });
    req.user = user;

    next();
  });
}
