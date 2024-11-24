const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/users'); // Asegúrate de que el modelo sea correcto

const router = express.Router();

// Registro de usuarios
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
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
    res.status(200).json({ message: 'Sesión iniciada exitosamente' });
});

// Logout de usuarios
router.post('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            return res.status(500).json({ message: 'Error al cerrar sesión', err });
        }
        res.status(200).json({ message: 'Sesión cerrada exitosamente' });
    });
});

module.exports = router;
