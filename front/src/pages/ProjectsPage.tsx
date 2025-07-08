import React, { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import ProjectGrid from '../components/ProjectGrid';

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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio de Proyectos</h1>
          <p className="text-gray-600">Explora mi colección de proyectos y trabajos realizados</p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={() => handleFilterChange({ featured: true })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter.featured 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Destacados
            </button>
            
            <button
              onClick={() => handleFilterChange({})}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !filter.featured && !filter.technology
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Todos
            </button>

            {(filter.featured || filter.technology) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-lg text-sm font-medium text-red-600 border border-red-300 hover:bg-red-50 transition-colors"
              >
                Limpiar filtros
              </button>
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