const mongoose = require('mongoose');
const { dbConnect } = require('../utils/dbConnect'); // Ajusta la ruta según tu estructura

// Cadena de conexión real (asegúrate de tener acceso a esta base de datos)
const dbURI = 'mongodb+srv://dswback:tMIpU1Zp7W8oysyw@cluster0.j8nz6.mongodb.net/yourDatabaseName';

describe('dbConnect', () => {
  // Limpia las conexiones antes y después de cada prueba
  beforeEach(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close(); // Cierra la conexión si ya existe
    }
  });

  afterEach(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close(); // Cierra la conexión después de cada prueba
    }
  });

  it('Probando la conexión a la base', async () => {
    await dbConnect(dbURI); // Conecta a la base de datos
    const connectionState = mongoose.connection.readyState;
    expect(connectionState).toBe(1); // 1 indica que está conectado
  });

  it('Probando credenciales inválidas', async () => {
    const invalidDbURI = 'mongodb+srv://invalidUser:invalidPassword@cluster0.j8nz6.mongodb.net/invalidDatabase';
    await expect(dbConnect(invalidDbURI)).rejects.toThrow('No se pudo conectar a la base de datos');
  });
});
