require('dotenv').config();  // Cargar variables de entorno desde el archivo .env

const express = require('express');
const app = express();
const sequelize = require('./config/db'); // Conexión a la base de datos
const cors = require('cors');

// Middleware para analizar el cuerpo de las solicitudes POST
app.use(express.json());  // Esto permite que puedas recibir datos JSON en los cuerpos de las solicitudes POST
app.use(cors());  // Habilitar CORS

// Importa las rutas correctamente
const restauranteRoutes = require('./routes/restauranteRoutes');
const sucursalRoutes = require('./routes/sucursalRoutes');
const mesasRoutes = require('./routes/mesasRoutes');

// Usa las rutas con prefijos específicos
app.use('/api/restaurantes', restauranteRoutes);
app.use('/api/sucursales', sucursalRoutes);
app.use('/api/mesas', mesasRoutes);

// Sincroniza la base de datos
sequelize.sync({ force: false })  // Sincroniza sin eliminar las tablas existentes
  .then(() => {
    console.log('Base de datos sincronizada');
    // Iniciar el servidor solo después de sincronizar la base de datos
    const port = process.env.PORT || 3000;  // Usar el puerto desde la variable de entorno o por defecto 3000
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error al sincronizar la base de datos:', err);
    process.exit(1); // Termina el proceso si hay un error en la sincronización
  });