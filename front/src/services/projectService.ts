import apiService from './api';
import type { Project } from '../types';
class ProjectService {
  // Get all projects with optional filters
  async getProjects(featured?: boolean, technology?: string): Promise<Project[]> {
    try {
      const params: any = {};
      if (featured !== undefined) params.featured = featured;
      if (technology) params.technology = technology;

      return await apiService.get<Project[]>('/projects', params);
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  }

  // Get project by slug
  async getProjectBySlug(slug: string): Promise<Project> {
    try {
      return await apiService.get<Project>(`/projects/${slug}`);
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  }

  // Create new project (requires authentication)
  async createProject(projectData: Partial<Project>): Promise<Project> {
    try {
      return await apiService.post<Project>('/projects', projectData);
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  // Update project (requires authentication)
  async updateProject(id: string, projectData: Partial<Project>): Promise<Project> {
    try {
      return await apiService.put<Project>(`/projects/${id}`, projectData);
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  }

  // Delete project (requires authentication and admin role)
  async deleteProject(id: string): Promise<void> {
    try {
      await apiService.delete<void>(`/projects/${id}`);
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }

  // Get featured projects
  async getFeaturedProjects(): Promise<Project[]> {
    return this.getProjects(true);
  }

  // Get projects by technology
  async getProjectsByTechnology(technology: string): Promise<Project[]> {
    return this.getProjects(undefined, technology);
  }
}

export default new ProjectService();