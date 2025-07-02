const express = require('express');
const router = express.Router();
const { 
  getProjects, 
  getProjectBySlug, 
  createProject, 
  updateProject, 
  deleteProject 
} = require('../controllers/projectController');
const { authenticateToken } = require('../middleware/auth');

// Rutas públicas
router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);

// Rutas protegidas (requieren autenticación)
router.post('/', authenticateToken, createProject);
router.put('/:id', authenticateToken, updateProject);
router.delete('/:id', authenticateToken, deleteProject);

module.exports = router;
