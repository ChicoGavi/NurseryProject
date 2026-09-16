import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.status(200).json({ welcome: 'Welcome Agreee world nursery' });
});

export default app;
