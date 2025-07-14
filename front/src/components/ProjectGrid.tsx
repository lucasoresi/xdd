import React from 'react';
import type { Project } from '../types';
import ProjectCard from './ProjectCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { Card, CardContent } from '@/components/ui/card';
import { FolderOpen } from 'lucide-react';

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
      <div className={`flex flex-col justify-center items-center min-h-96 ${className}`}>
        <LoadingSpinner size="large" />
        <p className="mt-4 text-gray-600">Cargando proyectos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="p-8">
          <ErrorMessage message={error} onRetry={onRetry} />
        </CardContent>
      </Card>
    );
  }

  if (projects.length === 0) {
    return (
      <div className={`text-center py-16 ${className}`}>
        <Card className="max-w-md mx-auto">
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground mb-6">
              <FolderOpen className="w-20 h-20 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold mb-3">No hay proyectos disponibles</h3>
            <p className="text-muted-foreground leading-relaxed">
              Parece que no hay proyectos para mostrar en este momento. 
              <br />
              <span className="text-sm">Intenta ajustar los filtros o vuelve más tarde.</span>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
};

export default ProjectGrid;