const { testConnection } = require('../config/supabase');

async function runTest() {
  console.log('🔍 Probando conexión con Supabase...');
  const isConnected = await testConnection();
  
  if (isConnected) {
    console.log('✅ ¡Todo está funcionando correctamente!');
    process.exit(0);
  } else {
    console.error('❌ Hubo un problema con la conexión');
    process.exit(1);
  }
}

runTest();
