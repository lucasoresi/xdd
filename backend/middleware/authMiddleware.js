const jwt = require('jsonwebtoken');
const { supabase } = require('../config/supabase');

// Middleware para proteger rutas
const protect = async (req, res, next) => {
  let token;

  // Verificar si el token está en el encabezado de autorización
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Obtener el token del encabezado
      token = req.headers.authorization.split(' ')[1];

      // Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Obtener el usuario del token y adjuntarlo al objeto de solicitud
      const { data: user, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', decoded.id)
        .single();

      if (error || !user) {
        return res.status(401).json({ error: 'No autorizado, usuario no encontrado' });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Error en la autenticación:', error);
      res.status(401).json({ error: 'No autorizado, token fallido' });
    }
  }

  if (!token) {
    return res.status(401).json({ error: 'No autorizado, no se proporcionó token' });
  }
};

// Middleware para verificar roles de administrador
const admin = (req, res, next) => {
  if (req.user && req.user.username === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Acceso denegado, se requieren privilegios de administrador' });
  }
};

module.exports = { protect, admin };
