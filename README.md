# 🚀 Portfolio de Proyectos

> Aplicación web full-stack para gestión de portfolios de proyectos con React, Express y Supabase

## 📋 Descripción

**Portfolio de Proyectos** es una aplicación web moderna que permite crear y gestionar portfolios de proyectos personales. Los usuarios pueden subir imágenes, categorizar proyectos por tecnología, agregar descripciones y enlaces, y marcar proyectos como destacados.

## 🛠️ Tecnologías

### Frontend
- **React 18** con TypeScript
- **Vite** como build tool
- **TailwindCSS** para estilos
- **React Router** para navegación
- **Axios** para HTTP requests
- **Heroicons** y **Lucide React** para iconos

### Backend
- **Express.js** con middleware de seguridad
- **Supabase** como base de datos principal y storage
- **JWT** para autenticación
- **Multer** para carga de archivos
- **Helmet** y **CORS** para seguridad

### Infraestructura
- **Docker Compose** para orquestación
- **Nginx** como reverse proxy
- **Redis** para cache y sesiones
- **pgAdmin** para administración de BD

## 🏗️ Arquitectura

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Nginx     │    │   React     │    │   Express   │
│  (Proxy)    │◄──►│ (Frontend)  │◄──►│  (Backend)  │
│   :80       │    │   :3000     │    │   :3001     │
└─────────────┘    └─────────────┘    └─────────────┘
                                              │
                   ┌─────────────┐    ┌─────────────┐
                   │    Redis    │    │  Supabase   │
                   │  (Cache)    │    │ (DB+Storage)│
                   │   :6379     │    │   Cloud     │
                   └─────────────┘    └─────────────┘
```

## 🚀 Inicio Rápido

### 1. Prerrequisitos
- Docker y Docker Compose instalados
- Node.js 18+ (para desarrollo local)

### 2. Configuración
```bash
# Clonar el repositorio
git clone <repo-url>
cd portfolio-proyectos

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Supabase
```

### 3. Ejecutar con Docker
```bash
# Iniciar todos los servicios
docker-compose up

# O en background
docker-compose up -d

# Ver logs
docker-compose logs -f
```

### 4. Desarrollo Local
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (nueva terminal)
cd front
npm install
npm run dev
```

## 📦 Variables de Entorno

```env
# Supabase
SUPABASE_URL=tu_supabase_url
SUPABASE_ANON_KEY=tu_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key # (Opcional, para upload admin)

# Backend
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
JWT_SECRET=tu_jwt_secret_seguro

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# pgAdmin
PGADMIN_DEFAULT_EMAIL=admin@example.com
PGADMIN_DEFAULT_PASSWORD=admin123
```

## 🔗 URLs de Acceso

| Servicio | URL | Descripción |
|----------|-----|-------------|
| Frontend | http://localhost:3000 | Aplicación React |
| Backend | http://localhost:3001 | API REST |
| Health Check | http://localhost:3001/health | Estado del servidor |
| Supabase Test | http://localhost:3001/api/test-db | Prueba de conexión |
| Nginx | http://localhost:80 | Reverse proxy |
| pgAdmin | http://localhost:5050 | Admin de BD |

## 📁 Estructura del Proyecto

```
portfolio-proyectos/
├── backend/                    # API Express
│   ├── config/                # Configuración
│   │   ├── supabase.js        # Cliente Supabase
│   │   └── database.js        # Config PostgreSQL (fallback)
│   ├── controllers/           # Lógica de negocio
│   │   ├── authController.js  # Autenticación
│   │   ├── projectController.js # Gestión de proyectos
│   │   └── uploadController.js  # Subida de archivos
│   ├── middleware/            # Middlewares
│   │   ├── auth.js           # Autenticación JWT
│   │   └── authMiddleware.js  # Middleware de auth
│   ├── routes/               # Rutas API
│   │   ├── authRoutes.js     # Rutas de auth
│   │   ├── projectRoutes.js  # Rutas de proyectos
│   │   └── uploadRoutes.js   # Rutas de upload
│   └── server.js             # Servidor principal
│
├── front/                     # Aplicación React
│   ├── src/
│   │   ├── components/       # Componentes reutilizables
│   │   │   ├── ui/          # Componentes UI base
│   │   │   ├── Layout.tsx    # Layout principal
│   │   │   ├── ProjectCard.tsx # Tarjeta de proyecto
│   │   │   └── ProjectGrid.tsx # Grid de proyectos
│   │   ├── pages/           # Páginas principales
│   │   │   ├── HomePage.tsx  # Página inicio
│   │   │   ├── ProjectsPage.tsx # Lista de proyectos
│   │   │   ├── NewProjectPage.tsx # Crear proyecto
│   │   │   ├── ProjectDetailPage.tsx # Detalle proyecto
│   │   │   ├── LoginPage.tsx # Iniciar sesión
│   │   │   └── RegisterPage.tsx # Registro
│   │   ├── services/        # Servicios API
│   │   │   ├── api.ts       # Cliente HTTP
│   │   │   ├── authService.ts # Servicio auth
│   │   │   ├── projectService.ts # Servicio proyectos
│   │   │   └── uploadService.ts # Servicio upload
│   │   ├── types/           # Tipos TypeScript
│   │   └── hooks/           # Hooks customizados
│   │       └── useProjects.ts # Hook para proyectos
│   ├── package.json         # Dependencias frontend
│   └── vite.config.ts       # Configuración Vite
│
├── database/                 # Scripts de BD
│   ├── init.sql            # Inicialización PostgreSQL
│   ├── migration-add-is-main.sql # Migración ejemplo
│   └── seed.sql            # Datos de prueba
│
├── nginx/                   # Configuración Nginx
│   └── nginx.conf          # Proxy reverso
│
├── docker-compose.yml       # Orquestación Docker
├── CLAUDE.md               # Instrucciones para Claude
└── README.md               # Este archivo
```

## 🔧 Comandos Útiles

### Docker
```bash
# Reconstruir servicios
docker-compose build

# Reiniciar servicio específico
docker-compose restart backend

# Ver logs de un servicio
docker-compose logs -f frontend

# Limpiar y reconstruir
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

### Base de Datos
```bash
# Migraciones (si usas PostgreSQL)
docker-compose exec backend npm run migrate

# Seeders
docker-compose exec backend npm run seed

# Conectar a PostgreSQL
docker-compose exec database psql -U app_user -d app_database
```

### Desarrollo
```bash
# Instalar dependencias frontend
cd front && npm install

# Instalar dependencias backend
cd backend && npm install

# Ejecutar tests
npm test

# Linting
npm run lint
```

## 🌟 Características

- ✅ **Autenticación JWT** con Supabase
- ✅ **CRUD completo** de proyectos
- ✅ **Carga de imágenes** desde el ordenador con Supabase Storage
- ✅ **Categorización** por tecnologías
- ✅ **Proyectos destacados** (featured)
- ✅ **Diseño responsive** con TailwindCSS
- ✅ **Hot reload** en desarrollo
- ✅ **Middleware de seguridad** (Helmet, CORS)
- ✅ **Validación de archivos** (tipo y tamaño)
- ✅ **Preview de imágenes** en tiempo real
- ✅ **Gestión completa de usuarios** (registro/login)
- ✅ **Context API** para estado global

## 🔒 Seguridad

- **Helmet.js** para headers de seguridad
- **CORS** configurado para frontend
- **Rate limiting** para prevenir abuse
- **JWT** para autenticación stateless
- **Validación** de entrada con express-validator
- **Sanitización** de datos de usuario

## 📱 API Endpoints

### Autenticación
```
POST /api/auth/login     # Iniciar sesión
POST /api/auth/register  # Registrar usuario
GET  /api/auth/profile   # Obtener perfil
```

### Proyectos
```
GET    /api/projects           # Listar proyectos
POST   /api/projects           # Crear proyecto
GET    /api/projects/new       # Formulario nuevo proyecto
GET    /api/projects/:slug     # Obtener proyecto por slug
PUT    /api/projects/:id       # Actualizar proyecto
DELETE /api/projects/:id       # Eliminar proyecto
```

### Upload de Archivos
```
POST   /api/upload/image       # Subir imagen (requiere auth)
DELETE /api/upload/image       # Eliminar imagen (requiere auth)
```

### Salud
```
GET /health              # Estado del servidor
GET /api/test-db         # Prueba conexión Supabase
```

## 🐛 Solución de Problemas

### Puerto ocupado
```bash
# Verificar puertos en uso
netstat -4 -tln | grep :3000

# Cambiar puerto en docker-compose.yml
```

### Problemas de conexión BD
```bash
# Verificar logs de Supabase
docker-compose logs backend

# Verificar variables de entorno
docker-compose exec backend env | grep SUPABASE
```

### Error de upload de imágenes
```bash
# Verificar bucket en Supabase Storage
# 1. Ir a Supabase Dashboard > Storage
# 2. Crear bucket 'project-images' si no existe
# 3. Configurar políticas RLS:

# Política para INSERT (cualquier usuario)
CREATE POLICY "Anyone can upload to project-images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'project-images');

# Política para SELECT (lectura pública)
CREATE POLICY "Anyone can view project images" ON storage.objects
FOR SELECT USING (bucket_id = 'project-images');
```

### Loop infinito en React
```bash
# Si ves "Maximum update depth exceeded"
# Verificar useEffect dependencies en Layout.tsx
# Asegurar que no haya dependencias circulares
```

### Hot reload no funciona
```bash
# Verificar variables de entorno
CHOKIDAR_USEPOLLING=true
WATCHPACK_POLLING=true

# Reiniciar frontend
docker-compose restart frontend
```

## 📚 Recursos

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [Supabase Docs](https://supabase.com/docs)
- [TailwindCSS](https://tailwindcss.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la branch (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**Desarrollado con ❤️ usando React, Express y Supabase**