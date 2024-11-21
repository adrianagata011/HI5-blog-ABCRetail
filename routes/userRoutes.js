const express = require('express');
const router = express.Router();
const session = require('express-session');
const User = require('../models/users');

// Configuración de sesiones
router.use(session({
    secret: 'tuClaveSecreta',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Ruta para mostrar el formulario de registro
router.get('/register', (req, res) => {
    res.render('register');
});

// Ruta para procesar el registro
router.post('/register', async (req, res) => {
    const { newUsername, newPassword } = req.body;
    try {
        const existingUser = await User.findOne({ username: newUsername });
        if (existingUser) {
            return res.render('register', { message: 'El usuario ya existe', messageType: 'error' });
        }

        const newUser = new User({ username: newUsername, password: newPassword });
        await newUser.save();

        req.session.username = newUsername;
        res.redirect('/blog/posts');
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).send('Error del servidor');
    }
});

// Ruta para procesar el inicio de sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && await user.verificarPassword(password)) {
            req.session.username = username;
            res.redirect('/blog/posts');
        } else {
            res.render('login', { message: 'Usuario o contraseña incorrectos', messageType: 'error' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send('Error del servidor');
    }
});

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
