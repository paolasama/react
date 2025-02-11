// Middleware para manejar errores
const errorHandler = (err, req, res, next) => {
  // 📌 Imprime el error en la consola para depuración
  console.error("❌ Error detectado:", err.message); // Muestra el mensaje de error
  console.error(err.stack); // Muestra la pila de errores para depurar más detalles

  // 📌 Responde al cliente con un JSON detallado del error
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Error interno del servidor", // Si el error tiene mensaje, lo muestra; de lo contrario, mensaje genérico
      status: err.status || 500, // Si el error tiene un código de estado, lo usa; de lo contrario, por defecto 500
    },
  });
};

module.exports = errorHandler;
