import dotenv from 'dotenv';
import { z } from 'zod';

// Carga las variables del archivo .env
dotenv.config();

// Define qué variables son obligatorias y de qué tipo
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().min(1, { message: 'DATABASE_URL es obligatoria' }),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('\n❌ VARIABLES DE ENTORNO INVÁLIDAS O FALTANTES:');
  parsedEnv.error.issues.forEach((issue) => {
    console.error(`  - [${issue.path.join('.')}]: ${issue.message}`);
  });
  console.error('\nRevisa tu archivo .env en el servidor.\n');
  process.exit(1); // Apaga el servidor si faltan variables
}

export const env = parsedEnv.data;
