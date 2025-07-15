import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import authService from '../services/authService';
import Notification from './Notification';
import { Button } from './ui/button';
import { Avatar } from './ui/avatar';
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from './ui/dropdown-menu';
import { 
  User, 
  LogOut, 
  Plus, 
  Folder, 
  Home, 
  ChevronDown,
  Code2,
  Github
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, setUser, setAuthenticated, showNotification } = useAppContext();

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      if (authService.isAuthenticated()) {
        const user = authService.getCurrentUser();
        if (user && !state.user) {
          setUser(user);
          setAuthenticated(true);
        }
      }
    };

    checkAuth();
  }, []); // Remove dependencies to prevent infinite loop

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setAuthenticated(false);
      showNotification('Sesión cerrada exitosamente', 'success');
      navigate('/');
    } catch (error) {
      showNotification('Error al cerrar sesión', 'error');
    }
  };

  const navLinkClass = (path: string) => `
    relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 
    ${isActive(path) 
      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
    }
  `;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-40">
        <div className="container mx-auto px-4" style={{ maxWidth: '70%' }}>
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Portfolio
                </span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              <Link to="/" className={navLinkClass('/')}>
                <Home className="w-4 h-4 inline-block mr-2" />
                Inicio
              </Link>
              <Link to="/projects" className={navLinkClass('/projects')}>
                <Folder className="w-4 h-4 inline-block mr-2" />
                Proyectos
              </Link>
            </nav>

            {/* Right Side - Authentication */}
            <div className="flex items-center space-x-4">
              {state.isAuthenticated && state.user ? (
                <>
                  {/* Add Project Button */}
                  <Button 
                    asChild 
                    size="sm" 
                    className="hidden md:flex bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <Link to="/projects/new">
                      <Plus className="w-4 h-4 mr-2" />
                      Nuevo Proyecto
                    </Link>
                  </Button>

                  {/* User Profile Dropdown */}
                  <DropdownMenu
                    trigger={
                      <div className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <Avatar 
                          src={state.user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(state.user.name)}&background=random`}
                          alt={state.user.name}
                          fallback={state.user.name}
                          size="sm"
                        />
                        <div className="hidden md:block">
                          <span className="text-sm font-medium text-gray-900">
                            {state.user.name}
                          </span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      </div>
                    }
                  >
                    <DropdownMenuItem 
                      onClick={() => navigate('/profile')}
                      icon={<User />}
                    >
                      Mi Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => navigate('/projects?filter=my')}
                      icon={<Folder />}
                    >
                      Mis Proyectos
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      icon={<LogOut />}
                      className="text-red-600 hover:bg-red-50"
                    >
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenu>
                </>
              ) : (
                /* Guest Navigation */
                <div className="flex items-center space-x-3">
                  <Button asChild variant="outline" size="sm">
                    <Link to="/login">
                      Iniciar Sesión
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                    <Link to="/register">
                      Registrarse
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>
      
      {/* Notification System */}
      <Notification />

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-lg border-t border-gray-200/50 mt-12">
        <div className="container mx-auto px-4 py-8" style={{ maxWidth: '70%' }}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <a 
                href="https://github.com/GiuseGio2004/Practicos-Programacion-III.git" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors text-sm"
              >
                <Github className="w-4 h-4" />
                <span>github.com/GiuseGio2004/Practicos-Programacion-III</span>
              </a>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <span className="font-medium">Grupo N°12</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;