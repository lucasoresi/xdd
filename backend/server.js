const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Inicializar la aplicación Express
const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Las variables de entorno de Supabase no están configuradas correctamente');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
});

// Hacer que supabase esté disponible en todas las rutas
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

// Middleware de seguridad
app.use(helmet());

// CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

// Middleware de parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Rutas de la API
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// Health check en la raíz
app.get('/health', async (req, res) => {
  try {
    // Verificar conexión con Supabase
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .limit(1);

    if (error) throw error;

    res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: 'Connected'
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: 'ERROR',
      database: 'Connection failed',
      error: error.message
    });
  }
});

// Ruta de prueba de conexión a Supabase
app.get('/api/test-db', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .limit(5);

    if (error) throw error;

    res.json({
      success: true,
      data: data || []
    });
  } catch (error) {
    console.error('Database test failed:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Algo salió mal!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Error interno del servidor'
  });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Ruta no encontrada',
    path: req.originalUrl 
  });
});

// Iniciar el servidor
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);
  console.log(`📝 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API disponible en: http://localhost:${PORT}/api`);
  console.log(`🔍 Prueba la conexión a la base de datos visitando: http://localhost:${PORT}/api/test-db`);
});

// Manejo de cierre graceful
const gracefulShutdown = async () => {
  console.log('\n🔴 Recibida señal de apagado. Cerrando el servidor...');
  
  try {
    // Cerrar el servidor
    await new Promise((resolve) => server.close(resolve));
    console.log('✅ Servidor cerrado correctamente');
    process.exit(0);
  } catch (error) {
    console.error('Error durante el cierre del servidor:', error);
    process.exit(1);
  }
};

// Manejadores de señales
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Manejo de errores no capturados
process.on('uncaughtException', (error) => {
  console.error('⚠️ Error no capturado:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('⚠️ Promesa rechazada no manejada:', reason);
  process.exit(1);
});
