import { env } from '../config/env.js';
import express from 'express';

const app = express();

app.use(express.json());

// Ruta de prueba para verificar que el monorepo conecta frontend y backend
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: env.NODE_ENV,
    serverTime: new Date().toISOString(),
  });
});

app.listen(env.PORT, () => {
  console.log(`[server]: API corriendo en http://localhost:${env.PORT}`);
});
