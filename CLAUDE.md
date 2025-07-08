# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Portfolio de Proyectos** (Project Portfolio) application - a full-stack web application built with React frontend and Express backend using Supabase as the database. The application allows users to create project portfolios, upload project images, categorize by technology type, add descriptions and links, and mark projects as featured.

## Architecture

**Full-Stack Architecture:**
- **Frontend:** React 18 with TypeScript, Vite, TailwindCSS, React Router
- **Backend:** Express.js with Supabase integration
- **Database:** Supabase (PostgreSQL-based)
- **Infrastructure:** Docker Compose with hot reload for development
- **Services:** Nginx proxy, Redis cache, pgAdmin for database management

## Development Commands

### Docker Environment (Primary)
```bash
# Start all services (frontend, backend, database, nginx, redis, pgadmin)
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Clean rebuild
docker-compose down -v && docker-compose build --no-cache && docker-compose up
```

### Backend (Express)
```bash
# Development with hot reload
npm run dev

# Production start
npm start

# Database migrations
npm run migrate

# Database seeding
npm run seed

# Tests
npm test
```

### Frontend (React)
```bash
# Development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Key Configuration

### Environment Variables
The application uses Supabase instead of traditional PostgreSQL:
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `CORS_ORIGIN` - Frontend URL for CORS (default: http://localhost:3000)
- `PORT` - Backend port (default: 3001)

### Database Architecture
- **Primary Database:** Supabase (configured in `backend/config/supabase.js`)
- **Fallback Config:** PostgreSQL configuration exists in `backend/config/database.js` for Sequelize
- **Initialization:** Basic PostgreSQL extensions setup in `database/init.sql`

## Service Ports
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Database: localhost:5432
- Redis: localhost:6379
- pgAdmin: http://localhost:5050
- Nginx: http://localhost:80

## Key Files and Structure

### Backend (`backend/`)
- `server.js` - Main Express server with Supabase integration
- `config/supabase.js` - Supabase client configuration and connection testing
- `config/database.js` - PostgreSQL/Sequelize configuration (fallback)
- `routes/` - API routes (authRoutes, projectRoutes)
- `controllers/` - Business logic (authController, projectController)
- `middleware/` - Authentication and validation middleware

### Frontend (`front/`)
- `src/App.tsx` - Main React component (currently default Vite template)
- `package.json` - Includes React Router, Axios, Heroicons, TailwindCSS
- `vite.config.ts` - Vite configuration
- `tailwind.config.js` - TailwindCSS configuration

### Infrastructure
- `docker-compose.yml` - Multi-service Docker configuration with hot reload
- `nginx/nginx.conf` - Reverse proxy configuration
- `database/init.sql` - PostgreSQL initialization script

## Database Connection

The application primarily uses **Supabase** for database operations:
- Connection testing available at `/health` and `/api/test-db` endpoints
- Supabase client is attached to all requests via middleware (`req.supabase`)
- Authentication and data operations go through Supabase API

## Development Notes

- **Hot Reload:** Enabled for both frontend and backend in Docker environment
- **Database:** Supabase is the primary database, but PostgreSQL configuration exists as fallback
- **Testing:** Backend includes Jest and Supertest setup
- **CORS:** Configured to allow frontend requests
- **Security:** Helmet.js middleware enabled for security headers

## Health Checks

- Backend health: http://localhost:3001/health
- Database test: http://localhost:3001/api/test-db
- Supabase connection is verified in health checks

## Common Development Tasks

When working with this codebase:
1. Use `docker-compose up` to start the full development environment
2. Backend changes auto-reload via nodemon
3. Frontend changes auto-reload via Vite HMR
4. Database operations should use Supabase client (`req.supabase`)
5. API routes are prefixed with `/api/`