require('dotenv').config();  // Cargar variables de entorno desde el archivo .env

const express = require('express');
const { connectDB } = require('./config/db'); // Se importa la función de conexión
const cors = require('cors');

const app = express(); // Instancia de Express

// Deshabilitar la generación de ETag para que no se devuelva 304
app.set('etag', false);

// Middleware para parsear JSON y URL-encoded (asegúrate de que se ejecute antes de las rutas)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para registrar peticiones entrantes (depuración)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} body:`, req.body);
  next();
});

app.use(cors());

// Middleware para deshabilitar la caché durante desarrollo
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

// Importa y usa las rutas desde la carpeta "routes"
const restauranteRoutes = require('./routes/restauranteRoutes');
// Si tienes otras rutas como sucursales, agrégalas
// const sucursalRoutes = require('./routes/sucursalRoutes');

app.use('/api/restaurantes', restauranteRoutes);
// app.use('/api/sucursales', sucursalRoutes);

// Inicialización de conexión y sincronización del servidor
async function startServer() {
  try {
    await connectDB();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error iniciando el servidor:', error.message, error.stack);
    process.exit(1);
  }
}

startServer();