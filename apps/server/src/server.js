import { env } from '../config/env.js';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
app.use(express.json());

// 1. Configurar rutas absolutas para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Leer y parsear el archivo YAML
const swaggerFile = fs.readFileSync(
  path.join(__dirname, '../docs/openapi.yaml'),
  'utf8'
);
const swaggerDocument = YAML.parse(swaggerFile);

// 3. Montar la interfaz visual de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas de la aplicación
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: env.NODE_ENV,
    serverTime: new Date().toISOString(),
  });
});

// Ruta ficticia para cumplir el contrato (temporal)
app.get('/api/users', (req, res) => {
  res.json([
    { id: '123e4567', name: 'Ada Lovelace', email: 'ada@example.com' },
  ]);
});

app.listen(env.PORT, () => {
  console.info(`[server]: API corriendo en http://localhost:${env.PORT}`);
  console.info(
    `[docs]: Documentación Swagger en http://localhost:${env.PORT}/api-docs`
  );
});
