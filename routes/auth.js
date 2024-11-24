const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/users'); // Asegúrate de que el modelo sea correcto

const router = express.Router();

// Registro de usuarios
router.post('/register', async (req, res) => {
    const { email, password, role } = req.body; // Incluimos role en el registro
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, role: role || 'user' }); // Por defecto 'user'
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario', error });
    }
});

// Login de usuarios
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureMessage: true
}), (req, res) => {
    // Guardar información adicional del usuario en la sesión
    console.log(req.user)
    req.session.role = req.user.role;
    req.session.username = req.user.username;

    // Redirigir al usuario después del login
    res.redirect('/blog/posts');
});

// Logout de usuarios
router.post('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            return res.status(500).json({ message: 'Error al cerrar sesión', err });
        }
        req.session.destroy(); // Limpiar sesión completamente
        res.status(200).json({ message: 'Sesión cerrada exitosamente' });
    });
});

module.exports = router;
