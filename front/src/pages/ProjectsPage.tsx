import React, { useState } from 'react';
import type { Project } from '../types';
import { useProjects } from '../hooks/useProjects';
import ProjectGrid from '../components/ProjectGrid';
import { Button } from '@/components/ui/button';
import { Star, Grid3X3, X } from 'lucide-react';

const ProjectsPage: React.FC = () => {
  const [filter, setFilter] = useState<{ featured?: boolean; technology?: string }>({});
  const { projects, loading, error, refetch } = useProjects(filter);

  const handleFilterChange = (newFilter: { featured?: boolean; technology?: string }) => {
    setFilter(newFilter);
  };

  const clearFilters = () => {
    setFilter({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8" style={{ maxWidth: '70%' }} >
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-4">
            Portfolio de Proyectos
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explora mi colección de proyectos y trabajos realizados con las últimas tecnologías
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Button
              onClick={() => handleFilterChange({ featured: true })}
              variant={filter.featured ? "default" : "outline"}
              size="sm"
              className="rounded-full"
            >
              <Star className="w-4 h-4 mr-2" />
              Destacados
            </Button>
            
            <Button
              onClick={() => handleFilterChange({})}
              variant={!filter.featured && !filter.technology ? "default" : "outline"}
              size="sm"
              className="rounded-full"
            >
              <Grid3X3 className="w-4 h-4 mr-2" />
              Todos
            </Button>

            {(filter.featured || filter.technology) && (
              <Button
                onClick={clearFilters}
                variant="outline"
                size="sm"
                className="rounded-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <X className="w-4 h-4 mr-2" />
                Limpiar filtros
              </Button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <ProjectGrid 
          projects={projects}
          loading={loading}
          error={error}
          onRetry={refetch}
        />
      </div>
    </div>
  );
};

export default ProjectsPage;