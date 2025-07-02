require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Validar que las variables de entorno estén configuradas
const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  throw new Error(`Faltan variables de entorno requeridas: ${missingVars.join(', ')}`);
}

// Crear y exportar el cliente de Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: false, // No necesitamos persistencia de sesión en el backend
      detectSessionInUrl: false
    },
    global: {
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_ANON_KEY
      }
    }
  }
);

// Función para probar la conexión
const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);
    
    if (error) throw error;
    
    console.log('✅ Conexión a Supabase exitosa');
    return true;
  } catch (error) {
    console.error('❌ Error al conectar con Supabase:', error.message);
    return false;
  }
};

module.exports = {
  supabase,
  testConnection
};
