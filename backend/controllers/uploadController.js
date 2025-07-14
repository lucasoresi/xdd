const { supabase } = require('../config/supabase');

// Subir imagen al storage de Supabase
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó ningún archivo' });
    }

    // Verificar autenticación
    if (!req.user) {
      return res.status(401).json({ error: 'No autorizado' });
    }

    const file = req.file;
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = `${req.user.id}/${fileName}`;

    // Crear cliente Supabase con service key para bypass RLS
    const { createClient } = require('@supabase/supabase-js');
    const supabaseAdmin = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Subir archivo a Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from('project-images')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false
      });

    if (error) {
      console.error('Error uploading to Supabase Storage:', error);
      return res.status(500).json({ 
        error: 'Error al subir la imagen',
        details: error.message 
      });
    }

    // Obtener URL pública de la imagen
    const { data: urlData } = supabaseAdmin.storage
      .from('project-images')
      .getPublicUrl(filePath);

    res.json({
      message: 'Imagen subida exitosamente',
      url: urlData.publicUrl,
      path: filePath
    });

  } catch (error) {
    console.error('Error en upload de imagen:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: error.message 
    });
  }
};

// Eliminar imagen del storage de Supabase
const deleteImage = async (req, res) => {
  try {
    const { path } = req.body;

    if (!path) {
      return res.status(400).json({ error: 'Path de la imagen es requerido' });
    }

    // Verificar autenticación
    if (!req.user) {
      return res.status(401).json({ error: 'No autorizado' });
    }

    // Eliminar archivo de Supabase Storage
    const { error } = await supabase.storage
      .from('project-images')
      .remove([path]);

    if (error) {
      console.error('Error deleting from Supabase Storage:', error);
      return res.status(500).json({ 
        error: 'Error al eliminar la imagen',
        details: error.message 
      });
    }

    res.json({ message: 'Imagen eliminada exitosamente' });

  } catch (error) {
    console.error('Error en delete de imagen:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: error.message 
    });
  }
};

module.exports = {
  uploadImage,
  deleteImage
};