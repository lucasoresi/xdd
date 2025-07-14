export interface Technology {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  color?: string;
}

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
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  created_at: string;
  updated_at: string;
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

export interface ApiError {
  error: string;
  details?: string;
}