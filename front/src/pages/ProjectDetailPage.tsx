import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProject } from '../hooks/useProjects';
// import { useUser } from '../hooks/useUser';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft, ExternalLink, Github, Calendar, User, Tag, Star, Eye, Heart, Share2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Avatar } from '../components/ui/avatar';
// import BackgroundBlobEffect from '../components/BackgroundBlobEffect';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { project, loading, error } = useProject(slug || '');
  const { state } = useAppContext();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Obtener información del usuario del proyecto - temporalmente deshabilitado
  // const { user: projectUser, loading: userLoading } = useUser(project?.user_id);
  
  // Usar el usuario del proyecto si está disponible, sino el usuario actual si es el dueño
  const displayUser = project?.user || (project?.user_id === state.user?.id ? state.user : null);
  const userLoading = false;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full">
          <ErrorMessage message={error} />
          <div className="mt-4 text-center">
            <Link 
              to="/projects" 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Volver a proyectos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Proyecto no encontrado</h2>
          <Link 
            to="/projects" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Volver a proyectos
          </Link>
        </div>
      </div>
    );
  }

  const images = project.project_images || [];
  const currentImage = images[currentImageIndex];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background removed */}
      
      <div className="relative z-10 bg-gradient-to-br from-white/95 to-gray-50/90 backdrop-blur-sm min-h-screen">
        {/* Container con max-width */}
        <div className="container mx-auto px-4 py-8" style={{ maxWidth: '70%' }}>
          {/* Back Button */}
          <div className="mb-6">
            <Link to="/projects">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a proyectos
              </Button>
            </Link>
          </div>

          {/* Layout en dos columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 h-[calc(100vh-8rem)]">
            {/* Columna izquierda - Imagen principal */}
            <div className="lg:col-span-3 flex flex-col">
              {/* Header del proyecto */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  {project.is_featured && (
                    <Badge className="bg-yellow-500 text-yellow-900">
                      <Star className="w-3 h-3 mr-1" />
                      Destacado
                    </Badge>
                  )}
                  <Badge variant="outline">Proyecto</Badge>
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {project.title}
                </h1>
                
                <p className="text-lg text-gray-600 mb-6">
                  {project.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-4 mb-6">
                  {project.demo_url && (
                    <Button asChild>
                      <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Ver Demo
                      </a>
                    </Button>
                  )}
                  
                  {project.github_url && (
                    <Button asChild variant="outline">
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Ver Código
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Imagen principal */}
              <Card className="flex-1 p-4 bg-white/80 backdrop-blur-sm shadow-lg border-0">
                <div className="h-full flex flex-col">
                  {(images.length > 0 || project.featured_image) ? (
                    <>
                      {/* Imagen actual */}
                      <div className="flex-1 bg-gray-200 rounded-lg overflow-hidden mb-4">
                        <img 
                          src={currentImage?.url || project.featured_image || 'https://via.placeholder.com/800x450?text=Imagen+del+Proyecto'} 
                          alt={currentImage?.alt || project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Thumbnails */}
                      {images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {images.map((image, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                                index === currentImageIndex 
                                  ? 'border-blue-500 shadow-md' 
                                  : 'border-gray-300 hover:border-gray-400'
                              }`}
                            >
                              <img 
                                src={image.url} 
                                alt={image.alt || `${project.title} - ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {/* Si hay featured_image pero no project_images, agregar featured_image como thumbnail */}
                      {images.length === 0 && project.featured_image && (
                        <div className="flex gap-2 pb-2">
                          <div className="w-16 h-16 rounded-md overflow-hidden border-2 border-blue-500 shadow-md">
                            <img 
                              src={project.featured_image} 
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <div className="text-center text-white">
                        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                        <p className="opacity-90">Imagen no disponible</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Columna derecha - Información del proyecto */}
            <div className="lg:col-span-2 flex flex-col space-y-6 overflow-y-auto">
              {/* Información del autor */}
              <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg border-0">
                <h3 className="font-semibold text-gray-900 mb-4">Creado por</h3>
                <div className="flex items-center space-x-4">
                  <Avatar
                    src={displayUser?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayUser?.name || 'Usuario')}&background=random`}
                    alt={displayUser?.name || 'Usuario'}
                    fallback={displayUser?.name?.charAt(0) || 'U'}
                    size="lg"
                    className="border-2 border-white shadow-md"
                  />
                  <div className="flex-1">
                    {userLoading ? (
                      <div className="animate-pulse">
                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ) : (
                      <>
                        <p className="text-lg font-medium text-blue-600">{displayUser?.name || 'Usuario'}</p>
                        <p className="text-sm text-gray-500">{displayUser?.email || 'email@ejemplo.com'}</p>
                        <p className="text-sm text-gray-400 mt-1">{displayUser?.role || 'Desarrollador'}</p>
                      </>
                    )}
                  </div>
                </div>
              </Card>

              {/* Estadísticas */}
              <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg border-0">
                <h3 className="font-semibold text-gray-900 mb-4">Estadísticas</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Creado</span>
                    </div>
                    <span className="text-sm font-medium">{new Date(project.created_at).toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Vistas</span>
                    </div>
                    <span className="text-sm font-medium">127</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Me gusta</span>
                    </div>
                    <span className="text-sm font-medium">24</span>
                  </div>
                </div>
              </Card>

              {/* Tecnologías */}
              <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg border-0">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tecnologías
                </h3>
                {project.project_technologies && project.project_technologies.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {project.project_technologies.map((tech, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {tech.technologies.name}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No especificado</p>
                )}
              </Card>

              {/* Descripción del proyecto */}
              <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg border-0 flex-1">
                <h3 className="font-semibold text-gray-900 mb-4">Descripción</h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {project.long_description || project.description}
                  </p>
                </div>
              </Card>

              {/* Acciones sociales */}
              <Card className="p-4 bg-white/80 backdrop-blur-sm shadow-lg border-0">
                <div className="flex items-center justify-center space-x-3">
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartir
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4 mr-2" />
                    Me gusta
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;