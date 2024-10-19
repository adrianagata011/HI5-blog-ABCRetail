const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const session = require('express-session');
const app = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Servir archivos estáticos

// Importar middleware de autenticación a nivel global
const { isAuthenticated } = require('./middlewares/authMiddleware');

// Configuración de las sesiones
app.use(session({
    secret: 'tuClaveSecreta', // Cambia esto por una clave secreta que solo tú conozcas
    resave: false, // No volver a guardar la sesión si no ha cambiado
    saveUninitialized: false, // No crear sesiones vacías
    cookie: { secure: false } // Debe ser true si usas HTTPS
}));

// Rutas
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
app.use('/blog', blogRoutes);
app.use('/user', userRoutes);

// inicia bloque de la API
// Importar las rutas de la API
const postsApi = require('./api/postsApi');
// Usar las rutas de la API
app.use('/api', postsApi);
// finaliza bloque de la API

// Página principal ahora ocultando el header en login
app.get('/', (req, res) => {
    res.render('login');
});

// Middleware para hacer disponible la variable currentUser entre las diferentes vistas
// app.use((req, res, next) => {
//     res.locals.currentUser = req.session.username || null;
//     next();
// });


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});