import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import projectService from '../services/projectService';
import uploadService from '../services/uploadService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, Loader2, Upload, X, Image } from 'lucide-react';
import type { Project } from '../types';

const NewProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const { state: { user }, showNotification } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    featured_image: '',
    demo_url: '',
    repo_url: '',
    is_featured: false,
    is_published: true
  });

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user) {
      showNotification('Debes iniciar sesión para crear un proyecto', 'error');
      navigate('/login');
    }
  }, [user, navigate, showNotification]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      showNotification('Solo se permiten archivos de imagen', 'error');
      return;
    }

    // Validar tamaño (5MB máximo)
    if (file.size > 5 * 1024 * 1024) {
      showNotification('El archivo no puede ser mayor a 5MB', 'error');
      return;
    }

    setUploadingImage(true);
    try {
      const response = await uploadService.uploadImage(file);
      setFormData(prev => ({ ...prev, featured_image: response.url }));
      setImagePreview(response.url);
      showNotification('Imagen subida exitosamente', 'success');
    } catch (error: any) {
      console.error('Error uploading image:', error);
      showNotification(
        error.message || 'Error al subir la imagen',
        'error'
      );
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, featured_image: '' }));
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const newProject = await projectService.createProject({
        ...formData,
        user_id: user.id
      });

      showNotification('Proyecto creado exitosamente', 'success');
      navigate(`/projects/${newProject.slug}`);
    } catch (error: any) {
      console.error('Error creating project:', error);
      showNotification(
        error.response?.data?.error || 'Error al crear el proyecto',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8" style={{ maxWidth: '70%' }}>
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => navigate('/projects')}
            variant="outline"
            size="sm"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Proyectos
          </Button>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-2">
            Nuevo Proyecto
          </h1>
          <p className="text-muted-foreground">
            Crea un nuevo proyecto para tu portfolio
          </p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Información del Proyecto</CardTitle>
            <CardDescription>
              Completa los detalles de tu nuevo proyecto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Nombre del proyecto"
                  required
                />
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug *</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="url-del-proyecto"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Se generará automáticamente desde el título
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Descripción *</Label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Breve descripción del proyecto"
                  className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Contenido Detallado</Label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Descripción detallada del proyecto, tecnologías utilizadas, etc."
                  className="min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>

              {/* Featured Image */}
              <div className="space-y-2">
                <Label>Imagen Principal</Label>
                
                {/* Upload or URL Input */}
                <div className="space-y-4">
                  {/* File Upload */}
                  <div>
                    <Label htmlFor="image-upload" className="text-sm text-muted-foreground">
                      Subir desde tu ordenador
                    </Label>
                    <div className="mt-1">
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('image-upload')?.click()}
                        disabled={uploadingImage}
                        className="w-full justify-center"
                      >
                        {uploadingImage ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Subiendo...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            Seleccionar Imagen
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* OR Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        O
                      </span>
                    </div>
                  </div>

                  {/* URL Input */}
                  <div>
                    <Label htmlFor="featured_image" className="text-sm text-muted-foreground">
                      URL de imagen externa
                    </Label>
                    <Input
                      id="featured_image"
                      name="featured_image"
                      type="url"
                      value={formData.featured_image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Image Preview */}
                {(formData.featured_image || imagePreview) && (
                  <div className="mt-4">
                    <div className="relative inline-block">
                      <img
                        src={imagePreview || formData.featured_image}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg border"
                        onError={() => {
                          setImagePreview(null);
                          if (formData.featured_image.startsWith('http')) {
                            showNotification('Error al cargar la imagen', 'error');
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* URLs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="demo_url">URL Demo</Label>
                  <Input
                    id="demo_url"
                    name="demo_url"
                    type="url"
                    value={formData.demo_url}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="repo_url">URL Repositorio</Label>
                  <Input
                    id="repo_url"
                    name="repo_url"
                    type="url"
                    value={formData.repo_url}
                    onChange={handleInputChange}
                    placeholder="https://github.com/user/repo"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    id="is_featured"
                    name="is_featured"
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border border-input bg-background"
                  />
                  <Label htmlFor="is_featured">Proyecto destacado</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    id="is_published"
                    name="is_published"
                    type="checkbox"
                    checked={formData.is_published}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border border-input bg-background"
                  />
                  <Label htmlFor="is_published">Publicar proyecto</Label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/projects')}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Crear Proyecto
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewProjectPage;