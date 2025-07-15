import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useProjects } from '../hooks/useProjects';
import { Avatar } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { User, Mail, Calendar, Edit, Settings, Folder } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { state } = useAppContext();
  const navigate = useNavigate();
  const { projects } = useProjects();
  
  // Filtrar proyectos del usuario actual
  const userProjects = projects.filter(project => project.user_id === state.user?.id);
  const featuredProjects = userProjects.filter(project => project.is_featured);

  if (!state.isAuthenticated || !state.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Acceso no autorizado</h1>
          <p className="text-gray-600">Debes iniciar sesión para ver tu perfil.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4" style={{ maxWidth: '800px' }}>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Mi Perfil
          </h1>
          <p className="text-gray-600">
            Gestiona tu información personal y configuraciones de cuenta
          </p>
        </div>

        {/* Profile Card */}
        <Card className="p-8 mb-8 bg-white/80 backdrop-blur-sm shadow-lg border-0">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <Avatar 
                src={state.user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(state.user.name)}&background=random&size=128`}
                alt={state.user.name}
                fallback={state.user.name}
                size="xl"
                className="w-32 h-32 border-4 border-white shadow-lg"
              />
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{state.user.name}</h2>
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{state.user.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Miembro desde {new Date(state.user.created_at).toLocaleDateString('es-ES')}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
                  <User className="w-4 h-4" />
                  <span>ID: {state.user.id}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Button 
                  onClick={() => navigate('/projects?filter=my')}
                  variant="default" 
                  size="sm"
                  className="rounded-full"
                >
                  <Folder className="w-4 h-4 mr-2" />
                  Mis Proyectos
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="rounded-full"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar Perfil
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <div className="text-3xl font-bold text-blue-600 mb-2">{userProjects.length}</div>
            <div className="text-gray-600">Proyectos Creados</div>
          </Card>
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <div className="text-3xl font-bold text-purple-600 mb-2">{featuredProjects.length}</div>
            <div className="text-gray-600">Proyectos Destacados</div>
          </Card>
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <div className="text-3xl font-bold text-green-600 mb-2">{userProjects.length * 42}</div>
            <div className="text-gray-600">Vistas Estimadas</div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-lg border-0">
          <h3 className="text-xl font-semibold mb-6">Actividad Reciente</h3>
          {userProjects.length > 0 ? (
            <div className="space-y-4">
              {userProjects.slice(0, 5).map((project, index) => (
                <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Folder className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{project.title}</h4>
                      <p className="text-sm text-gray-500">
                        Proyecto {project.is_featured ? 'destacado' : 'creado'}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {new Date(project.created_at).toLocaleDateString('es-ES')}
                  </div>
                </div>
              ))}
              {userProjects.length > 5 && (
                <div className="text-center pt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/projects?filter=my')}
                  >
                    Ver todos los proyectos
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No hay actividad reciente</p>
              <p className="text-sm">Crea tu primer proyecto para comenzar</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;