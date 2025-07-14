import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import type { User } from '../types/index';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  notification: {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  } | null;
}

type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'SET_NOTIFICATION'; payload: { message: string; type: 'success' | 'error' | 'info' | 'warning' } | null }
  | { type: 'CLEAR_NOTIFICATION' }
  | { type: 'RESET_STATE' };

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  notification: null,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    case 'SET_NOTIFICATION':
      return { ...state, notification: action.payload };
    case 'CLEAR_NOTIFICATION':
      return { ...state, notification: null };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  showNotification: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
  clearNotification: () => void;
  resetState: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const setUser = (user: User | null) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  const setAuthenticated = (authenticated: boolean) => {
    dispatch({ type: 'SET_AUTHENTICATED', payload: authenticated });
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    dispatch({ type: 'SET_NOTIFICATION', payload: { message, type } });
    // Auto-clear notification after 5 seconds
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' });
    }, 5000);
  };

  const clearNotification = () => {
    dispatch({ type: 'CLEAR_NOTIFICATION' });
  };

  const resetState = () => {
    dispatch({ type: 'RESET_STATE' });
  };

  const value: AppContextType = {
    state,
    setLoading,
    setError,
    setUser,
    setAuthenticated,
    showNotification,
    clearNotification,
    resetState,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};