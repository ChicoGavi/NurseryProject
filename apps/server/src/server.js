import { env } from '../config/env.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import app from './app.js';

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

// Ruta ficticia para cumplir el contrato (temporal)
app.get('/api/users', (req, res) => {
  res.json([
    { id: '123e4567', name: 'Ada Lovelace', email: 'ada@example.com' },
  ]);
});

app.listen(env.PORT, () => {
  console.info(`[server]: API corriendo en http://127.0.0.1:${env.PORT}`);
  console.info(
    `[docs]: Documentación Swagger en http://127.0.0.1:${env.PORT}/api-docs`
  );
});
