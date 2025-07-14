const express = require('express');
const multer = require('multer');
const router = express.Router();
const { uploadImage, deleteImage } = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');

// Configuración de multer para archivos en memoria
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB máximo
  },
  fileFilter: (req, file, cb) => {
    // Solo permitir imágenes
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen'), false);
    }
  }
});

// Middleware para manejar errores de multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'El archivo es demasiado grande. Máximo 5MB.' });
    }
    return res.status(400).json({ error: 'Error al procesar el archivo.' });
  }
  if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};

// Rutas protegidas (requieren autenticación)
router.post('/image', protect, upload.single('image'), handleMulterError, uploadImage);
router.delete('/image', protect, deleteImage);

module.exports = router;