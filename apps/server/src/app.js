import express from 'express';
import routes from './routes/index.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.status(200).json({ welcome: 'Welcome Agreee world nursery' });
});

export default app;
