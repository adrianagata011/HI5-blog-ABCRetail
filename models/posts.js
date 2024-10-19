class Posts {
    constructor(title, content, category, author) {
        this.title = title;
        this.content = content;
        this.category = category;
        this.author = author;
        this.comments = [];
        this.createdAt = new Date();
    }

    // Método para agregar un comentario
    agregarComentario(comment) {
        this.comments.push(comment);
    }

    // Método para actualizar el contenido de la publicación
    actualizarContenido(nuevoContenido) {
        this.content = nuevoContenido;
    }

    // Método para obtener la información de la publicación
    obtenerInfo() {
        return {
            title: this.title,
            content: this.content,
            category: this.category,
            author: this.author,
            comments: this.comments,
            createdAt: this.createdAt
        };
    }
}

module.exports = { Posts };
