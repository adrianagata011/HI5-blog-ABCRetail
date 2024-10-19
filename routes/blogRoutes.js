const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const session = require('express-session');
const path = require('path');
const filePath = path.join(__dirname, '../data/posts.json');


// Configuración de las sesiones
router.use(session({
    secret: 'tuClaveSecreta', // Cambia esto por una clave secreta que solo tú conozcas
    resave: false, // No volver a guardar la sesión si no ha cambiado
    saveUninitialized: false, // No crear sesiones vacías
    cookie: { secure: false } // Debe ser true si usas HTTPS
}));

// Importar las funciones del archivo utils.js
const { loadPosts, loadUsers, savePosts, saveUsers } = require('../utils/utils');

// Importar el middleware de autenticación
const { isAuthenticated } = require('../middlewares/authMiddleware');

// Usar el middleware de autenticación globalmente en todas las rutas
router.use(isAuthenticated); // Esto afectará a todas las rutas

// Ruta para mostrar las publicaciones
router.get('/posts', isAuthenticated, (req, res) => {
    const posts = loadPosts(); // Cargar las publicaciones desde posts.json
    const currentUser = req.session.username;
    res.render('index', { posts, currentUser}); // Pasar las publicaciones a la vista
});

//CREAR una nueva publicación
router.post('/create', isAuthenticated, (req, res) => {
    const validCategories = ['Avisos', 'Guias', 'General'];
    const { title, content, category } = req.body;
    
    // Verificar si la categoría es válida
    if (!validCategories.includes(category)) {
        return res.status(400).json({ error: 'No intentes jugar con el código' });
    }
    const posts = loadPosts();
    // Agregar el post con el autor sacado de la sesión
    posts.push({ title, content, category, author: req.session.username, comments: [] });
    savePosts(posts);
    res.redirect('/blog/posts');
});

// EDITAR PUBLICACION parte 1: Ruta para recuperar una publicación
router.get('/edit/:index', isAuthenticated, (req, res) => {
    const index = req.params.index;
    const posts = loadPosts();
    // Verificar si la publicación existe
    const post = posts[index];
    if (!post) {
        return res.status(404).send('La publicación no existe.');
    }
    const username = req.session.username;
    if (post.author === username) {
        res.render('edit', { post, index });
    } else {
        res.send('No tienes permiso para editar esta publicación.');
    }
});

// EDITAR PUBLICACION parte 2: Ruta para actualizar una publicación
router.post('/edit/:index', isAuthenticated, (req, res) => {
    const index = req.params.index;
    const { title, content, category } = req.body;
    const posts = loadPosts();

    // Verificar si la publicación existe
    const post = posts[index];
    if (!post) {
        return res.status(404).send('La publicación no existe.');
    }

    const username = req.session.username;
    if (post.author === username) {
        posts[index] = { 
            title: title,
            content: content,
            category: category,
            author: post.author,
            comments: post.comments 
        };
        savePosts(posts);
        res.redirect('/blog/posts');

    } else {
        res.status(403).send('No tienes permiso para editar esta publicación.');
//        res.send('No tienes permiso para editar esta publicación.');
    }
});

// ELIMINAR una publicación
router.delete('/delete/:index', isAuthenticated, (req, res) => {
    const index = req.params.index;
    const posts = loadPosts();

    // Verificar si la publicación existe
    const post = posts[index];
    if (!post) {
        return res.status(404).send('La publicación no existe.');
    }

    const username = req.session.username;
    if (post.author === username) {
        posts.splice(index, 1);
        savePosts(posts);
        res.redirect('/blog/posts');
    } else {
        res.status(403).send('No tienes permiso para eliminar esta publicación.');
    }
});

// Recibir y procesar los comentarios
router.post('/comment/:index', isAuthenticated, (req, res) => {
    const index = req.params.index;
    const { comment } = req.body;
    const posts = loadPosts();
    const post = posts[index];
    const username = req.session.username; // Usuario autenticado

    // Verificar si el array de comentarios existe, si no, inicializarlo
    if (!post.comments) {
        post.comments = [];
    }

    // Crear el nuevo comentario
    const newComment = {
        author: username,
        content: comment,
        date: new Date().toLocaleString() // Fecha y hora actual
    };

    // Añadir el comentario al array de comentarios de la publicación
    post.comments.push(newComment);
    savePosts(posts); // Guardar los cambios en el archivo

    // Redirigir a la página de publicaciones
    res.redirect('/blog/posts');
});

// BUSCAR publicaciones
// router.get('/search', (req, res) => {
//     const searchTerm = req.query.q; // Captura el término de búsqueda desde la query string
    
//     if (!searchTerm) {
//         return res.status(400).send('Debe proporcionar un término de búsqueda');
//     }

//     const posts = loadPosts(); // Carga las publicaciones desde el archivo JSON
//     const filteredPosts = posts.filter(post => 
//         post.title.includes(searchTerm) || post.content.includes(searchTerm)
//     );

//     // Renderiza la vista con los resultados de la búsqueda
//     res.render('searchResults', { posts: filteredPosts });
// });
// Ruta de búsqueda
router.get('/search', async (req, res) => {
    const searchTerm = req.query.q; // Obtiene el término de búsqueda de la consulta

    // Verifica si se ha proporcionado un término de búsqueda
    if (!searchTerm) {
        return res.status(400).json({ error: 'El término de búsqueda es obligatorio' }); // Devuelve un error si no hay término
    }

    try {
        // Lee el archivo que contiene las publicaciones
        const data = await fs.readFile(filePath, 'utf8'); // Lee el contenido del archivo posts.json
        const posts = JSON.parse(data) || []; // Parsea los datos a un array de objetos

        // Filtra las publicaciones que coinciden con el término de búsqueda
        const filteredPosts = posts.filter(post => {
            return post.title.toLowerCase().includes(searchTerm.toLowerCase()) || // Comprueba si el título incluye el término
                   post.content.toLowerCase().includes(searchTerm.toLowerCase()); // Comprueba si el contenido incluye el término
        });

        // Renderiza la vista index.pug y pasa las publicaciones filtradas
        // res.render('index', { posts: filteredPosts }); // Muestra las publicaciones filtradas en la vista
        
        // Define arrayvacio basado en si filteredPosts está vacío
        const arrayvacio = filteredPosts.length === 0 ? 1 : 0;

        // Renderiza la vista index.pug y pasa las publicaciones filtradas y la variable arrayvacio
        res.render('index', { posts: filteredPosts, arrayvacio }); // Pasa posts y arrayvacio a la vista

    
    } catch (err) {
        console.error(err); // Imprime el error en la consola para depuración
        res.status(500).json({ error: 'Error al leer la base de datos' }); // Devuelve un error si no se puede leer el archivo
    }
});


// Ruta de filtrado
router.get('/filter', async (req, res) => {
    const category = req.query.category;

    // Verifica si se ha proporcionado una categoría
    if (!category) {
        return res.status(400).json({ error: 'La categoría es obligatoria' });
    }

    try {
        // Lee el archivo que contiene las publicaciones
        const data = await fs.readFile(filePath, 'utf8');
        const posts = JSON.parse(data) || [];

        // Filtra las publicaciones por categoría
        const filteredPosts = posts.filter(post => post.category === category);
        
        // Renderiza la vista index.pug y pasa las publicaciones filtradas
        res.render('index', { posts: filteredPosts });
    } catch (err) {
        // Manejo de errores al leer el archivo
        console.error(err); // Imprime el error en la consola para depuración
        res.status(500).json({ error: 'Error al leer la base de datos' });
    }
});


module.exports = router;