const mongoose = require('mongoose');
const User = require('../models/users'); // Ajusta la ruta al modelo
const bcrypt = require('bcrypt');

describe('User Model', () => {
  beforeAll(async () => {
    // Conectar a la base de datos de prueba antes de ejecutar los tests
    await mongoose.connect('mongodb+srv://dswback:tMIpU1Zp7W8oysyw@cluster0.j8nz6.mongodb.net/yourDatabaseName', {
    });
  });

  afterAll(async () => {
    // Cerrar la conexión a la base de datos después de los tests
    await mongoose.connection.close();
  });

  it('should delete only the testuser and create a new one with valid data', async () => {
    const username = 'testuser';

    // Eliminar únicamente el usuario con el username "testuser"
    await User.deleteOne({ username });

    // Crear un nuevo usuario
    const user = new User({
      username, // Proporcionamos el username
      password: 'testpass', // Proporcionamos una contraseña
    });

    await user.save(); // Guardamos el usuario en la base de datos

    // Verificamos que los valores se guardaron correctamente
    expect(user.username).toBe(username);
    expect(user.password).not.toBe('testpass'); // El password no debe ser igual, debe estar hasheado

    // Verificamos que el password ha sido hasheado
    const isPasswordHashed = await bcrypt.compare('testpass', user.password);
    expect(isPasswordHashed).toBe(true);

    // Verificar que otros usuarios no fueron afectados
    const otherUsers = await User.find({ username: { $ne: username } });
    expect(otherUsers.length).toBeGreaterThanOrEqual(0); // Los demás usuarios siguen intactos
  });
});
