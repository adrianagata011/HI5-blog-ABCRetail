const mongoose = require('mongoose');

// Definir el esquema de comentario
const commentSchema = new mongoose.Schema({
    author: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

// Definir el esquema de post
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    comments: [commentSchema], // Relacionar comentarios con publicaciones
    createdAt: { type: Date, default: Date.now }
});

// Crear el modelo de post
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
