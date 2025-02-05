const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

const db = require('./models');
const errorHandler = require('./middlewares/errorHandler');
const restauranteRoutes = require('./routes/restauranteRoutes');
const menuRoutes = require('./routes/menuRoutes'); // Verifica que esta línea esté correctamente

dotenv.config();

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/restaurantes', restauranteRoutes);
app.use('/api/menus', menuRoutes);  // Esta ruta debe estar correctamente configurada

// Manejo de errores
app.use(errorHandler);

// Sincronización de la base de datos
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Base de datos sincronizada correctamente.');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });

module.exports = app;
