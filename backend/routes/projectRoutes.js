const express = require('express');
const router = express.Router();
const { 
  getProjects, 
  getProjectBySlug, 
  createProject, 
  updateProject, 
  deleteProject 
} = require('../controllers/projectController');
const { protect, admin } = require('../middleware/authMiddleware');

// Rutas públicas
router.get('/', getProjects);
router.get('/new', (req, res) => {
  // Endpoint para mostrar formulario de nuevo proyecto
  res.json({ message: 'Formulario de nuevo proyecto' });
});
router.get('/:slug', getProjectBySlug);

// Rutas protegidas (requieren autenticación)
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, admin, deleteProject); // Solo administradores pueden eliminar

module.exports = router;
