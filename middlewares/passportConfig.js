const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/users'); // Asegúrate de que el modelo sea correcto

// Configurar estrategia local
passport.use(new LocalStrategy({
    usernameField: 'email', // Campo de usuario
    passwordField: 'password' // Campo de contraseña
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'Email no registrado.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Contraseña incorrecta.' });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

// Serializar usuario
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserializar usuario
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
