# 🌿 Sistema de Inventario Botánico

Una aplicación web full-stack para la gestión eficiente del inventario de plantas. Permite visualizar, agregar, editar y eliminar existencias, con un sistema de roles para proteger acciones administrativas.

## Características Principales

- **Catálogo Dinámico:** Visualización de plantas con indicadores visuales de stock (Normal, Bajo, Agotado).
- **Gestión de Inventario (CRUD):** Creación, lectura, actualización y eliminación de productos.
- **Autenticación y Autorización:** Acceso protegido por JWT y renderizado condicional de botones según el rol del usuario (Admin / Usuario normal).
- **Diseño Responsivo:** Interfaz moderna y limpia construida con Tailwind CSS.

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React, React Router, Tailwind CSS, Context API.
- **Backend:** Node.js, ExpressJS, JWT.
- **Base de Datos & ORM:** PostgreSQL, Prisma.

## 🚀 Instalación y Configuración Local

Sigue estos pasos para ejecutar el proyecto en tu máquina local.

### Prerrequisitos

- Node.js (24.19.0) Version
- PostgreSQL corriendo en tu máquina LOCAL

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/tu-usuario/tu-repo.git](https://github.com/tu-usuario/tu-repo.git)
   cd tu-repo

   ```
2. **Configurar la Base de Datos:** Crea un archivo .env en la carpeta del backend y agrega tus credenciales:
   ```bash
       DATABASE_URL="postgresql://usuario:password@localhost:5432/nombre_db?schema=public"
   JWT_SECRET="tu_secreto_super_seguro"

   ```
3. Instalar dependencias y migrar (Backend):
   ```bash
   cd tu-repo
   npm install
   npx prisma migrate dev
   npm run dev
   ```

## 📂 Estructura del Frontend

El proyecto sigue principios de separación de responsabilidades:

- /components: Componentes visuales (UI) y modales.

- /context: Estado global de autenticación (AuthContext).

- /hooks: Lógica de negocio encapsulada (useInventory, useAuth).

- /services: Llamadas a la API (apiClient.js).

## 📂 Estructura del Backend

El proyecto sigue principios de MVC:

- /controllers: Manejar la logica HTTP.

- /middlewares: Maneja la logica de Auth del sistema.

- /routes: Se encuentran todas las rutas a los endpoints.

- /services: Dispone la informacion del controller y maneja BBDD con Prisma ORM.
- /utils: Maneja logica de validacion de creacion del usuario en Auth

## 👨‍💻 Autor

Creado por Santiago Gaviria (KrakMutex) - https://portfolio-sgc.vercel.app/
