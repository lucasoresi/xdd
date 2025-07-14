import React from 'react';
import type { Project } from '../types';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Star, Image } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, className = '' }) => {
  // Get main image - first try project_images, then fall back to featured_image
  const mainImage = project.project_images?.find(img => img.is_main) || project.project_images?.[0];
  const imageUrl = mainImage?.url || project.featured_image;

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${className}`}>
      {/* Project Image */}
      <div className="aspect-video bg-gradient-to-br from-muted/40 to-muted relative overflow-hidden rounded-t-lg">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={mainImage?.alt_text || project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        
        {/* Fallback placeholder */}
        <div className={`${imageUrl ? 'hidden' : ''} w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/20 to-muted/40`}>
          <Image className="w-16 h-16 text-muted-foreground/40" />
        </div>
        
        {/* Featured Badge */}
        {project.is_featured && (
          <div className="absolute top-3 right-3">
            <Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
              <Star className="w-3 h-3 mr-1" />
              Destacado
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="line-clamp-2 text-lg">
          {project.title}
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-3">
        {/* Technologies */}
        {project.project_technologies && project.project_technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.project_technologies.slice(0, 4).map((tech, index) => (
              <Badge 
                key={index}
                variant="secondary"
                className="text-xs"
              >
                {tech.technologies?.name || 'Tech'}
              </Badge>
            ))}
            {project.project_technologies.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{project.project_technologies.length - 4} más
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-3">
        <Button asChild variant="ghost" size="sm">
          <Link to={`/projects/${project.slug}`}>
            Ver detalles
            <ExternalLink className="w-4 h-4 ml-2" />
          </Link>
        </Button>
        
        <div className="flex gap-2">
          {project.demo_url && (
            <Button asChild variant="ghost" size="icon">
              <a 
                href={project.demo_url} 
                target="_blank" 
                rel="noopener noreferrer"
                title="Ver demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          )}
          
          {(project.github_url || project.repo_url) && (
            <Button asChild variant="ghost" size="icon">
              <a 
                href={project.github_url || project.repo_url} 
                target="_blank" 
                rel="noopener noreferrer"
                title="Ver código"
              >
                <Github className="w-4 h-4" />
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;