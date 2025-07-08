import React from 'react';
import { Project } from '../types';
import ProjectCard from './ProjectCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

interface ProjectGridProps {
  projects: Project[];
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
  className?: string;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ 
  projects, 
  loading, 
  error, 
  onRetry,
  className = '' 
}) => {
  if (loading) {
    return (
      <div className={`flex justify-center items-center min-h-96 ${className}`}>
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <ErrorMessage message={error} onRetry={onRetry} />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No hay proyectos disponibles</h3>
          <p className="text-gray-500">Parece que no hay proyectos para mostrar en este momento.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectGrid;