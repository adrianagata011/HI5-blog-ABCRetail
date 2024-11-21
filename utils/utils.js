const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const session = require('express-session');

// Cargar publicaciones desde posts.json
function loadPosts() {
    try {
        const data = fs.readFileSync('data/posts.json');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al cargar las publicaciones:', error);
        return [];
    }
}

// Guardar publicaciones en posts.json
function savePosts(posts) {
    fs.writeFileSync('data/posts.json', JSON.stringify(posts, null, 2));
}

// Cargar usuarios desde data.json
function loadUsers() {
    try {
        const data = fs.readFileSync('data/users.json');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Guardar usuarios en data.json
function saveUsers(users) {
    fs.writeFileSync('data/users.json', JSON.stringify(users, null, 2));
}

module.exports = {
    loadPosts,
    savePosts,
    loadUsers,
    saveUsers
};