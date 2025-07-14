const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { supabase } = require('../config/supabase');

// Generar token JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d', // El token expira en 30 días
  });
};

// Registrar un nuevo usuario
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validar datos de entrada
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Por favor, proporcione todos los campos requeridos' });
    }

    // Nota: Supabase Auth manejará la verificación de email duplicado automáticamente

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el usuario en Supabase Auth
    const { data: authUser, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
        emailRedirectTo: undefined, // Deshabilitar redirect de email
      },
    });

    if (authError) throw authError;

    // Crear el perfil del usuario en la tabla profiles
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert([
        { 
          id: authUser.user.id,
          full_name: name,
          username: email.split('@')[0], // Usar parte del email como username
          avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
          bio: '',
          website: ''
        }
      ])
      .select()
      .single();

    if (profileError) throw profileError;

    // Generar token
    const token = generateToken(authUser.user.id);

    // Enviar respuesta
    res.status(201).json({
      id: authUser.user.id,
      name,
      email,
      role: 'user',
      token,
    });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ 
      error: 'Error al registrar el usuario',
      details: error.message 
    });
  }
};

// Iniciar sesión
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar datos de entrada
    if (!email || !password) {
      return res.status(400).json({ error: 'Por favor, proporcione correo electrónico y contraseña' });
    }

    // Iniciar sesión con Supabase Auth
    const { data: authUser, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      if (authError.message.includes('Invalid login credentials')) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
      if (authError.code === 'email_not_confirmed') {
        return res.status(401).json({ 
          error: 'Email no confirmado. Para desarrollo, este paso se omite automáticamente.',
          code: 'email_not_confirmed' 
        });
      }
      throw authError;
    }

    // Obtener el perfil del usuario
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.user.id)
      .single();

    if (profileError) throw profileError;

    // Generar token
    const token = generateToken(authUser.user.id);

    // Enviar respuesta
    res.json({
      id: authUser.user.id,
      name: profile.name,
      email: profile.email,
      role: profile.role,
      token,
    });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ 
      error: 'Error al iniciar sesión',
      details: error.message 
    });
  }
};

// Obtener perfil del usuario actual
const getMe = async (req, res) => {
  try {
    // El middleware de autenticación ya ha verificado el token y adjuntado el usuario a req.user
    const user = req.user;
    
    // Obtener el perfil completo del usuario
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    if (!profile) return res.status(404).json({ error: 'Usuario no encontrado' });

    // No enviar información sensible
    const { password, ...userData } = profile;
    
    res.json(userData);
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    res.status(500).json({ 
      error: 'Error al obtener el perfil del usuario',
      details: error.message 
    });
  }
};

// Cerrar sesión
const logout = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;
    
    res.status(200).json({ message: 'Sesión cerrada correctamente' });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    res.status(500).json({ 
      error: 'Error al cerrar sesión',
      details: error.message 
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  logout,
  generateToken
};
