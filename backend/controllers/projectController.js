const { supabase } = require('../config/supabase');

// Obtener todos los proyectos
const getProjects = async (req, res) => {
  try {
    const { featured, technology } = req.query;
    let query = supabase
      .from('projects')
      .select(`
        *,
        project_technologies(
          technology_id,
          technologies(*)
        ),
        project_images(
          id,
          url,
          alt_text,
          is_main,
          order
        )
      `);

    // Filtrar por destacados
    if (featured === 'true') {
      query = query.eq('is_featured', true);
    }

    // Filtrar por tecnología
    if (technology) {
      query = query.contains('technologies', [{ slug: technology }]);
    }

    const { data, error } = await query;

    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    res.status(500).json({ error: 'Error al obtener los proyectos' });
  }
};

// Obtener un proyecto por su slug
const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const { data: project, error } = await supabase
      .from('projects')
      .select(`
        *,
        project_technologies(
          technology_id,
          technologies(*)
        ),
        project_images(
          id,
          url,
          alt_text,
          is_main,
          order
        )
      `)
      .eq('slug', slug)
      .single();

    if (error) throw error;
    if (!project) return res.status(404).json({ error: 'Proyecto no encontrado' });
    
    res.json(project);
  } catch (error) {
    console.error('Error al obtener el proyecto:', error);
    res.status(500).json({ error: 'Error al obtener el proyecto' });
  }
};

// Crear un nuevo proyecto (protegido)
const createProject = async (req, res) => {
  try {
    // Verificar autenticación
    if (!req.user) {
      return res.status(401).json({ error: 'No autorizado' });
    }

    const projectData = {
      ...req.body,
      user_id: req.user.id, // Asignar el ID del usuario autenticado
    };

    const { data, error } = await supabase
      .from('projects')
      .insert([projectData])
      .select()
      .single();

    if (error) throw error;
    
    res.status(201).json(data);
  } catch (error) {
    console.error('Error al crear proyecto:', error);
    res.status(500).json({ error: 'Error al crear el proyecto' });
  }
};

// Actualizar un proyecto existente (protegido)
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar que el usuario es el propietario
    const { data: existingProject, error: fetchError } = await supabase
      .from('projects')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;
    if (!existingProject) return res.status(404).json({ error: 'Proyecto no encontrado' });
    if (existingProject.user_id !== req.user.id) {
      return res.status(403).json({ error: 'No tienes permiso para editar este proyecto' });
    }

    const { data, error } = await supabase
      .from('projects')
      .update(req.body)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    console.error('Error al actualizar proyecto:', error);
    res.status(500).json({ error: 'Error al actualizar el proyecto' });
  }
};

// Eliminar un proyecto (protegido)
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar que el usuario es el propietario
    const { data: existingProject, error: fetchError } = await supabase
      .from('projects')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;
    if (!existingProject) return res.status(404).json({ error: 'Proyecto no encontrado' });
    if (existingProject.user_id !== req.user.id) {
      return res.status(403).json({ error: 'No tienes permiso para eliminar este proyecto' });
    }

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar proyecto:', error);
    res.status(500).json({ error: 'Error al eliminar el proyecto' });
  }
};

module.exports = {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject
};
