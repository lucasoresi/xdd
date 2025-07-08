export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Portfolio de Proyectos';

export const ENDPOINTS = {
  PROJECTS: '/projects',
  PROJECT_BY_SLUG: (slug: string) => `/projects/${slug}`,
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
    LOGOUT: '/auth/logout',
  },
} as const;

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
} as const;

export const MESSAGES = {
  ERRORS: {
    NETWORK: 'Error de conexión. Por favor, verifica tu conexión a internet.',
    UNAUTHORIZED: 'No tienes autorización para realizar esta acción.',
    NOT_FOUND: 'El recurso solicitado no fue encontrado.',
    SERVER_ERROR: 'Error interno del servidor. Por favor, inténtalo más tarde.',
    VALIDATION: 'Los datos proporcionados no son válidos.',
  },
  SUCCESS: {
    PROJECT_CREATED: 'Proyecto creado exitosamente.',
    PROJECT_UPDATED: 'Proyecto actualizado exitosamente.',
    PROJECT_DELETED: 'Proyecto eliminado exitosamente.',
    LOGIN_SUCCESS: 'Sesión iniciada exitosamente.',
    LOGOUT_SUCCESS: 'Sesión cerrada exitosamente.',
    REGISTER_SUCCESS: 'Cuenta creada exitosamente.',
  },
} as const;