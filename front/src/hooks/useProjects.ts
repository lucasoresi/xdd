import { useState, useEffect } from 'react';
import type { Project } from '../types';
import projectService from '../services/projectService';

interface UseProjectsOptions {
  featured?: boolean;
  technology?: string;
  userId?: string;
}

export const useProjects = (options?: UseProjectsOptions) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await projectService.getProjects(options?.featured, options?.technology);
        
        // Filtrar por usuario si se especifica
        const filteredData = options?.userId 
          ? data.filter(project => project.user_id === options.userId)
          : data;
          
        setProjects(filteredData);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Error al cargar los proyectos');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [options?.featured, options?.technology, options?.userId]);

  const refetch = () => {
    setProjects([]);
    setError(null);
    setLoading(true);
    
    projectService.getProjects(options?.featured, options?.technology)
      .then((data) => {
        // Filtrar por usuario si se especifica
        const filteredData = options?.userId 
          ? data.filter(project => project.user_id === options.userId)
          : data;
        setProjects(filteredData);
      })
      .catch((err) => setError(err.response?.data?.error || 'Error al cargar los proyectos'))
      .finally(() => setLoading(false));
  };

  return { projects, loading, error, refetch };
};

export const useProject = (slug: string) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await projectService.getProjectBySlug(slug);
        setProject(data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Error al cargar el proyecto');
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  return { project, loading, error };
};