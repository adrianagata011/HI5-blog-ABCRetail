class Usuario {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    // Método para cambiar la contraseña
    cambiarPassword(nuevaPassword) {
        this.password = nuevaPassword;
    }

    // Método para verificar la contraseña
    verificarPassword(password) {
        return this.password === password;
    }
}

module.exports = { Usuario };
