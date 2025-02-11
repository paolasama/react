// Middleware de autenticación
module.exports = (req, res, next) => {
    // 📌 Imprime en consola cuando el middleware es ejecutado
    console.log("🛡️ Middleware de autenticación ejecutado");

    // 📌 Llama a la siguiente función en la cadena de middlewares
    next();
};
