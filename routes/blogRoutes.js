const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const session = require('express-session');
const Post = require('../models/posts');

// Configuración de sesiones
router.use(session({
    secret: 'tuClaveSecreta', // Cambia esto por una clave secreta
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Importar el middleware de autenticación
const { isAuthenticated } = require('../middlewares/authMiddleware');

// Usar el middleware de autenticación globalmente en todas las rutas
router.use(isAuthenticated);

// Ruta para mostrar las publicaciones
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find(); // Cargar todas las publicaciones de MongoDB
        const currentUser = req.session.username;
        res.render('index', { posts, currentUser });
    } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
        res.status(500).send('Error al obtener las publicaciones');
    }
});

// Crear una nueva publicación
router.post('/create', async (req, res) => {
    const validCategories = ['Avisos', 'Guias', 'General'];
    const { title, content, category } = req.body;

    // Verificar si la categoría es válida
    if (!validCategories.includes(category)) {
        return res.status(400).json({ error: 'No intentes jugar con el código' });
    }

    try {
        const newPost = new Post({
            title,
            content,
            category,
            author: req.session.username
        });
        await newPost.save(); // Guardar la publicación en MongoDB
        res.redirect('/blog/posts');
    } catch (error) {
        console.error('Error al crear la publicación:', error);
        res.status(500).send('Error al crear la publicación');
    }
});

// Editar publicación - mostrar la publicación para editar
router.get('/edit/:id', async (req, res) => {
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).send({ error: 'ID inválido' });
      }

    try {
        const post = await Post.findById(postId); // Buscar la publicación por ID
        if (!post) {
            return res.status(404).send('La publicación no existe.');
        }

        if (post.author !== req.session.username) {
            return res.status(403).send('No tienes permiso para editar esta publicación.');
        }

        res.render('edit', { post });
    } catch (error) {
        console.error('Error al obtener la publicación:', error);
        res.status(500).send('Error al obtener la publicación');
    }
});

// Editar publicación - actualizar la publicación
router.post('/edit/:id', async (req, res) => {
    const postId = req.params.id;
    const { title, content, category } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).send({ error: 'ID inválido' });
      }
      
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send('La publicación no existe.');
        }

        if (post.author !== req.session.username) {
            return res.status(403).send('No tienes permiso para editar esta publicación.');
        }

        // Actualizar los campos de la publicación
        post.title = title;
        post.content = content;
        post.category = category;
        await post.save(); // Guardar los cambios en MongoDB

        res.redirect('/blog/posts');
    } catch (error) {
        console.error('Error al actualizar la publicación:', error);
        res.status(500).send('Error al actualizar la publicación');
    }
});

// Eliminar una publicación
router.post('/delete/:id', async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send('La publicación no existe.');
        }

        if (post.author !== req.session.username) {
            return res.status(403).send('No tienes permiso para eliminar esta publicación.');
        }

        await Post.findByIdAndDelete(postId); // Eliminar la publicación de MongoDB
        res.redirect('/blog/posts');
    } catch (error) {
        console.error('Error al eliminar la publicación:', error);
        res.status(500).send('Error al eliminar la publicación');
    }
});

// Añadir un comentario a una publicación
router.post('/comment/:id', async (req, res) => {
    const postId = req.params.id;
    const { comment } = req.body;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send('La publicación no existe.');
        }

        // Agregar el comentario a la publicación
        post.comments.push({
            author: req.session.username,
            content: comment
        });
        await post.save(); // Guardar los cambios en MongoDB

        res.redirect('/blog/posts');
    } catch (error) {
        console.error('Error al agregar el comentario:', error);
        res.status(500).send('Error al agregar el comentario');
    }
});

// Buscar publicaciones
router.get('/search', async (req, res) => {
    const searchTerm = req.query.q;

    if (!searchTerm) {
        return res.status(400).json({ error: 'El término de búsqueda es obligatorio' });
    }

    try {
        const posts = await Post.find({
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } }, // Búsqueda en el título
                { content: { $regex: searchTerm, $options: 'i' } } // Búsqueda en el contenido
            ]
        });

        res.render('index', { posts, currentUser: req.session.username });
    } catch (error) {
        console.error('Error al buscar publicaciones:', error);
        res.status(500).send('Error al buscar publicaciones');
    }
});

// Filtrar publicaciones por categoría
router.get('/filter', async (req, res) => {
    const category = req.query.category;

    if (!category) {
        return res.status(400).json({ error: 'La categoría es obligatoria' });
    }

    try {
        const posts = await Post.find({ category }); // Filtrar publicaciones por categoría
        res.render('index', { posts, currentUser: req.session.username });
    } catch (error) {
        console.error('Error al filtrar publicaciones:', error);
        res.status(500).send('Error al filtrar publicaciones');
    }
});

module.exports = router;
