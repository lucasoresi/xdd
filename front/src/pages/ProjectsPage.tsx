import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Project } from '../types';
import { useProjects } from '../hooks/useProjects';
import { useAppContext } from '../context/AppContext';
import ProjectGrid from '../components/ProjectGrid';
// import BackgroundBlobEffect from '../components/BackgroundBlobEffect';
import { Button } from '../components/ui/button';
import { Star, Grid3X3, X, Code2, Rocket, TrendingUp, Folder } from 'lucide-react';

const ProjectsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { state } = useAppContext();
  const [filter, setFilter] = useState<{ featured?: boolean; technology?: string; userId?: string }>({});
  
  // Detectar si viene de "Mis proyectos"
  const showMyProjects = searchParams.get('filter') === 'my';
  
  // Configurar filtro inicial basado en la URL
  useEffect(() => {
    if (showMyProjects && state.user?.id) {
      setFilter({ userId: state.user.id });
    } else if (!showMyProjects) {
      setFilter({});
    }
  }, [showMyProjects, state.user?.id]);
  
  const { projects, loading, error, refetch } = useProjects(filter);

  const handleFilterChange = (newFilter: { featured?: boolean; technology?: string }) => {
    const updatedFilter = showMyProjects && state.user?.id 
      ? { ...newFilter, userId: state.user.id }
      : newFilter;
    setFilter(updatedFilter);
  };

  const clearFilters = () => {
    const baseFilter = showMyProjects && state.user?.id 
      ? { userId: state.user.id }
      : {};
    setFilter(baseFilter);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background removed */}
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12" style={{ maxWidth: '70%' }}>
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              {showMyProjects ? 'Mis Proyectos' : 'Portfolio de Proyectos'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {showMyProjects 
                ? 'Todos los proyectos que has creado y desarrollado. Aquí puedes ver tu progreso y logros.'
                : 'Descubre una colección cuidadosamente seleccionada de proyectos que demuestran mi pasión por la tecnología, la innovación y el desarrollo de soluciones creativas.'
              }
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full shadow-md">
                <Rocket className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">{projects.length} Proyectos</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full shadow-md">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">{projects.filter(p => p.is_featured).length} Destacados</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full shadow-md">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">En crecimiento</span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-4 items-center justify-center">
              {/* Toggle entre Mis proyectos / Todos los proyectos */}
              {state.isAuthenticated && (
                <>
                  <Button
                    onClick={() => {
                      setSearchParams(showMyProjects ? {} : { filter: 'my' });
                    }}
                    variant={showMyProjects ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                  >
                    <Folder className="w-4 h-4 mr-2" />
                    {showMyProjects ? 'Mis Proyectos' : 'Solo mis proyectos'}
                  </Button>
                  
                  <Button
                    onClick={() => {
                      setSearchParams({});
                    }}
                    variant={!showMyProjects ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                  >
                    <Grid3X3 className="w-4 h-4 mr-2" />
                    Todos los proyectos
                  </Button>
                </>
              )}
              
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
                variant={!filter.featured && !filter.technology && !showMyProjects ? "default" : "outline"}
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
                  className="rounded-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                >
                  <X className="w-4 h-4 mr-2" />
                  Limpiar filtros
                </Button>
              )}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="relative">
            <ProjectGrid 
              projects={projects}
              loading={loading}
              error={error}
              onRetry={refetch}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;