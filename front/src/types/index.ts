// User and Auth interfaces
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

// Technology interface
export interface Technology {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  color?: string;
}

// Project related interfaces
export interface ProjectTechnology {
  technology_id: string;
  technologies: Technology;
}

export interface ProjectImage {
  id: string;
  url: string;
  alt?: string;
  alt_text?: string;
  is_main?: boolean;
  order?: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  long_description?: string;
  is_featured: boolean;
  user_id: string;
  demo_url?: string;
  github_url?: string;
  repo_url?: string;
  featured_image?: string;
  created_at: string;
  updated_at: string;
  project_technologies: ProjectTechnology[];
  project_images: ProjectImage[];
  user?: User;
}

export interface AuthResponse {
  id: string;
  email: string;
  name: string;
  role: string;
  token: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

// API Error interface
export interface ApiError {
  error: string;
  details?: string;
}

// All types exported above