const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Definir el esquema de usuario
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Middleware para encriptar la contraseña antes de guardar
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Método para verificar la contraseña
userSchema.methods.verificarPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Crear el modelo de usuario
const User = mongoose.model('User', userSchema);

module.exports = User;
