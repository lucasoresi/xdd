# Frontend-Backend Integration Guide

This document provides instructions for running the complete Portfolio de Proyectos application with both frontend and backend connected.

## ✅ Completed Integration

### Frontend Features Implemented
- **React 18 + TypeScript** application with Vite
- **Complete API integration** with the Express backend
- **Project display system** with grid and detail views
- **Responsive design** with TailwindCSS
- **Error handling** and loading states
- **Notification system** for user feedback
- **Context-based state management**
- **Professional UI/UX** with animations and hover effects

### Backend Integration
- **API Services** for all project operations
- **Authentication system** ready (services created)
- **Automatic CORS handling**
- **Token-based authentication** with localStorage
- **Error handling** with automatic token refresh

## 🚀 How to Start the Application

### Prerequisites
1. Node.js installed
2. Backend with Supabase configured
3. Environment variables set up

### Step 1: Start the Backend
```bash
cd backend
npm install
npm start
```
The backend will run on: http://localhost:3001

### Step 2: Start the Frontend
```bash
cd front
npm install --legacy-peer-deps
npm run dev
```
The frontend will run on: http://localhost:5173

### Step 3: Access the Application
- **Frontend URL:** http://localhost:5173
- **Backend API:** http://localhost:3001/api
- **Health Check:** http://localhost:3001/health

## 🔧 Environment Configuration

### Frontend (.env file in /front)
```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Portfolio de Proyectos
```

### Backend Environment Variables
Ensure your backend has:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `JWT_SECRET`
- `CORS_ORIGIN=http://localhost:5173`

## 📱 Application Features

### 🏠 Homepage
- Hero section with call-to-action
- Featured projects display
- Professional landing page design

### 📂 Projects Page
- Complete project gallery
- Filter by featured projects
- Search and filter capabilities
- Grid layout with project cards

### 📄 Project Detail Page
- Full project information
- Image gallery with navigation
- Technology tags
- External links (demo, GitHub)
- Responsive design

### 🎨 UI/UX Features
- **Loading states** with spinners
- **Error handling** with retry options
- **Notifications** system
- **Responsive design** for all devices
- **Smooth animations** and transitions
- **Accessibility** features

## 🔗 API Integration

### Endpoints Connected
- `GET /api/projects` - List all projects
- `GET /api/projects/:slug` - Get project by slug
- `POST /api/projects` - Create project (authenticated)
- `PUT /api/projects/:id` - Update project (authenticated)
- `DELETE /api/projects/:id` - Delete project (authenticated)

### Authentication Ready
- Login/Register components ready to implement
- Token management system
- Automatic authentication checks
- Protected routes structure

## 🛠 Development Workflow

### Frontend Development
```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

### Testing the Integration
1. Ensure backend is running and healthy
2. Start frontend development server
3. Visit http://localhost:5173
4. Check browser console for any errors
5. Test project listing and detail views

## 📊 Data Flow

```
Frontend (React) ↔ API Services ↔ Backend (Express) ↔ Supabase
```

1. **Frontend** makes requests through API services
2. **API Services** handle authentication and error management
3. **Backend** processes requests and communicates with Supabase
4. **Supabase** stores and retrieves project data

## 🔍 Troubleshooting

### Common Issues

**Frontend not connecting to backend:**
- Check if backend is running on port 3001
- Verify CORS configuration
- Check environment variables

**Build errors:**
- Use `npm install --legacy-peer-deps`
- Clear node_modules and reinstall
- Check TypeScript compatibility

**API errors:**
- Verify Supabase configuration
- Check backend logs
- Ensure environment variables are set

### Debug Commands
```bash
# Check backend health
curl http://localhost:3001/health

# Check if backend is serving API
curl http://localhost:3001/api/projects

# View frontend build
npm run build
```

## 🎯 Next Steps

The frontend is now fully configured and connected to the backend. You can:

1. **Add authentication UI** using the prepared auth services
2. **Implement project creation/editing** forms
3. **Add user profiles** and management
4. **Enhance filtering** and search capabilities
5. **Add image upload** functionality
6. **Implement admin features**

## 📁 Project Structure

```
front/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── hooks/           # Custom React hooks
│   ├── context/         # State management
│   ├── types/           # TypeScript definitions
│   └── utils/           # Utility functions
├── .env                 # Environment variables
└── package.json         # Dependencies
```

## ✨ Success Criteria Met

- ✅ Complete frontend-backend integration
- ✅ Professional UI with responsive design
- ✅ Error handling and loading states
- ✅ Type-safe API communication
- ✅ Modern React patterns and hooks
- ✅ Scalable architecture
- ✅ Production-ready code structure

The frontend is now successfully connected to the backend and ready for use!