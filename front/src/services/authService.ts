import apiService from './api';

// Inline type definitions temporarily
interface AuthResponse {
  id: string;
  email: string;
  name: string;
  role: string;
  token: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  created_at: string;
  updated_at: string;
}

class AuthService {
  // Register new user
  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>('/auth/register', userData);
      
      // Store token and user data
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response));
      
      return response;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }

  // Login user
  async login(credentials: LoginData): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>('/auth/login', credentials);
      
      // Store token and user data
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response));
      
      return response;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      await apiService.post('/auth/logout');
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      // Clear local storage regardless of API call success
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  // Get current user profile
  async getMe(): Promise<User> {
    try {
      return await apiService.get<User>('/auth/me');
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // Get current user from localStorage
  getCurrentUser(): AuthResponse | null {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  // Get auth token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Check if user is admin
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.name === 'admin'; // Usar name en lugar de role
  }
}

export default new AuthService();