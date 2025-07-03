const express = require('express');
const router = express.Router();
const { register, login, getMe, logout } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Rutas públicas
router.post('/register', register);
router.post('/login', login);

// Ruta protegida - requiere autenticación
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);

module.exports = router;
