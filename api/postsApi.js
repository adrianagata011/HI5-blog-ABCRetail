const express = require('express');
const router = express.Router();
const { loadPosts, savePosts } = require('../utils/utils'); // Asegúrate de tener estas funciones en utils.js
const { isAuthenticated } = require('../middlewares/authMiddleware');

// API: Crear una nueva publicación
router.post('/posts', isAuthenticated, (req, res) => {
    const validCategories = ['Avisos', 'Guias', 'General'];
    const { title, content, category } = req.body;

    // Verificar si la categoría es válida
    if (!validCategories.includes(category)) {
        return res.status(400).json({ error: 'Categoría no válida' });
    }

    const posts = loadPosts();
    const newPost = {
        title: title,
        content: content,
        category: category,
        author: req.session.username,
        comments: []
    };

    posts.push(newPost);
    savePosts(posts);

    res.status(201).json({
        message: 'Publicación creada exitosamente',
        post: newPost
    });
});

// API: Eliminar una publicación
router.delete('/posts/:index', isAuthenticated, (req, res) => {
    const index = req.params.index;
    const posts = loadPosts();

    const post = posts[index];
    if (!post) {
        return res.status(404).json({ error: 'La publicación no existe.' });
    }

    if (post.author !== req.session.username) {
        return res.status(403).json({ error: 'No tienes permiso para eliminar esta publicación.' });
    }

    posts.splice(index, 1);
    savePosts(posts);

    res.status(200).json({ message: 'Publicación eliminada exitosamente' });
});

// API: Buscar publicaciones
router.get('/posts/search', isAuthenticated, (req, res) => {
    const searchTerm = req.query.q;
    if (!searchTerm) {
        return res.status(400).json({ error: 'El término de búsqueda es obligatorio' });
    }

    const posts = loadPosts();
    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    res.status(200).json({ posts: filteredPosts });
});

// API: Filtrar publicaciones por categoría
router.get('/posts/filter', isAuthenticated, (req, res) => {
    const category = req.query.category;
    if (!category) {
        return res.status(400).json({ error: 'La categoría es obligatoria' });
    }

    const posts = loadPosts();
    const filteredPosts = posts.filter(post => post.category === category);

    res.status(200).json({ posts: filteredPosts });
});

// API: Editar una publicación
router.put('/posts/:index', isAuthenticated, (req, res) => {
    const index = req.params.index;
    const { title, content, category } = req.body;
    const validCategories = ['Avisos', 'Guias', 'General'];

    // Cargar las publicaciones
    const posts = loadPosts();
    const post = posts[index];

    // Verificar si la publicación existe
    if (!post) {
        return res.status(404).json({ error: 'La publicación no existe.' });
    }

    // Verificar si el usuario es el autor de la publicación
    if (post.author !== req.session.username) {
        return res.status(403).json({ error: 'No tienes permiso para editar esta publicación.' });
    }

    // Validar categoría
    if (category && !validCategories.includes(category)) {
        return res.status(400).json({ error: 'Categoría no válida' });
    }

    // Actualizar los campos de la publicación
    if (title) post.title = title;
    if (content) post.content = content;
    if (category) post.category = category;

    // Guardar las publicaciones actualizadas
    savePosts(posts);

    res.status(200).json({
        message: 'Publicación editada exitosamente',
        post: post
    });
});

// API: Listar publicaciones con índices
router.get('/posts', isAuthenticated, (req, res) => {
    const posts = loadPosts(); // Cargar publicaciones desde el archivo JSON

    // Mapear las publicaciones para devolver el índice junto con los datos
    const postsWithIndex = posts.map((post, index) => ({
        index: index,
        title: post.title,
        author: post.author,
        category: post.category,
        commentsCount: post.comments.length
    }));

    res.status(200).json({
        message: 'Publicaciones encontradas',
        posts: postsWithIndex
    });
});


module.exports = router;
