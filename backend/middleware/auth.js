const jwt = require('jsonwebtoken');
const { supabase } = require('../config/supabase');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Token de autenticación requerido' });
    }

    // Verificar el token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verificar que el usuario existe en Supabase
    const { data: user, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', decoded.sub || decoded.user?.id)
      .single();

    if (error || !user) {
      return res.status(403).json({ error: 'Usuario no autorizado' });
    }

    // Agregar el usuario a la solicitud
    req.user = user;
    next();
  } catch (error) {
    console.error('Error de autenticación:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ error: 'Token inválido' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' });
    }
    res.status(500).json({ error: 'Error de autenticación' });
  }
};

module.exports = {
  authenticateToken
};
