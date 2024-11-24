const mongoose = require('mongoose');

async function dbConnect(uri) {
  try {
    await mongoose.connect(uri);
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error de conexión:', error);
    throw new Error('No se pudo conectar a la base de datos');
  }
}

module.exports = { dbConnect };
