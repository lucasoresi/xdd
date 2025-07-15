import React from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import ProjectCard from '../components/ProjectCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import Marquee from '../components/ui/marquee';
import { ArrowRight, CheckCircle, Zap, ExternalLink, Code2, Sparkles, Rocket } from 'lucide-react';

const HomePage: React.FC = () => {
  const { projects: featuredProjects, loading } = useProjects({ featured: true });

  return (
    <div className="min-h-screen max-w-[70%] mx-auto">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl">
        {/* Animated background */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 opacity-20 pattern-dots"></div>
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-8">
              <Badge variant="secondary" className="bg-white/10 border-white/20 text-white backdrop-blur-sm text-lg px-6 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Portfolio Profesional 2024
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-white leading-tight">
              Portfolio de
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Proyectos
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
              Descubre una colección cuidadosamente seleccionada de proyectos innovadores, 
              <span className="text-blue-300 font-semibold"> desarrollados con tecnologías de vanguardia</span> 
              y las mejores prácticas de la industria.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg px-8 py-4">
                <Link to="/projects">
                  <Rocket className="w-5 h-5 mr-2" />
                  Explorar Proyectos
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-4">
                <a href="#featured">
                  <Code2 className="w-5 h-5 mr-2" />
                  Ver Destacados
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">12+</div>
                <div className="text-gray-300 text-sm">Proyectos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">5+</div>
                <div className="text-gray-300 text-sm">Tecnologías</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">3+</div>
                <div className="text-gray-300 text-sm">Años</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-gray-300 text-sm">Pasión</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="featured" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
              <CheckCircle className="w-4 h-4 mr-2" />
              Proyectos Destacados
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Mis Mejores Trabajos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Una cuidadosa selección de proyectos que demuestran mi experiencia 
              en desarrollo full-stack y diseño de interfaces modernas
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <LoadingSpinner size="large" />
            </div>
          ) : (
            <>
              {featuredProjects.length > 0 ? (
                <>
                  {/* Marquee for featured projects */}
                  <div className="mb-16">
                    <Marquee pauseOnHover className="[--duration:20s]">
                      {featuredProjects.map((project) => (
                        <div
                          key={project.id}
                          className="mx-4 w-80 flex-shrink-0"
                        >
                          <ProjectCard project={project} />
                        </div>
                      ))}
                    </Marquee>
                  </div>
                  
                  <div className="text-center">
                    <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      <Link to="/projects">
                        Ver Todos los Proyectos
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </>
              ) : (
                <Card className="max-w-lg mx-auto shadow-xl">
                  <CardContent className="text-center py-16">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Code2 className="w-12 h-12 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl mb-3">Proyectos en Desarrollo</CardTitle>
                    <CardDescription className="text-lg mb-8">
                      Estoy trabajando en proyectos increíbles que pronto estarán disponibles.
                    </CardDescription>
                    <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      <Link to="/projects">
                        Explorar Proyectos
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </section>

    </div>
  );
};

export default HomePage;