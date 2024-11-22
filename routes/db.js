const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://dswback:tMIpU1Zp7W8oysyw@cluster0.j8nz6.mongodb.net/yourDatabaseName');
        console.log('MongoDB conectado');
    } catch (error) {
        console.error('Error conectando a MongoDB:', error.message);
        process.exit(1); // Finalizar la aplicación si no se conecta
    }
};

module.exports = connectDB;
