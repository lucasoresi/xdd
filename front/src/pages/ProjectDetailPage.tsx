import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProject } from '../hooks/useProjects';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { project, loading, error } = useProject(slug || '');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            to="/projects" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a proyectos
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-8 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {project.title}
                  {project.is_featured && (
                    <span className="ml-3 bg-yellow-400 text-yellow-800 text-sm px-2 py-1 rounded-full font-medium">
                      Destacado
                    </span>
                  )}
                </h1>
                <p className="text-gray-600 text-lg">
                  {project.description}
                </p>
              </div>
              
              <div className="flex gap-3">
                {project.demo_url && (
                  <a 
                    href={project.demo_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Ver Demo
                  </a>
                )}
                
                {project.github_url && (
                  <a 
                    href={project.github_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    Ver Código
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Images */}
          {images.length > 0 && (
            <div className="px-6 py-8 border-b border-gray-200">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
                <img 
                  src={currentImage.url} 
                  alt={currentImage.alt || project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex 
                          ? 'border-blue-500' 
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
            </div>
          )}

          {/* Content */}
          <div className="px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Descripción del Proyecto</h2>
                <div className="prose prose-gray max-w-none">
                  {project.long_description ? (
                    <div dangerouslySetInnerHTML={{ __html: project.long_description }} />
                  ) : (
                    <p className="text-gray-600">{project.description}</p>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div>
                {/* Technologies */}
                {project.project_technologies.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Tecnologías</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.project_technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium"
                        >
                          {tech.technologies.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Información del Proyecto</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Creado:</span>
                      <span className="ml-2 text-gray-900">
                        {new Date(project.created_at).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Actualizado:</span>
                      <span className="ml-2 text-gray-900">
                        {new Date(project.updated_at).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;