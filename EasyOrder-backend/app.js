const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

const db = require('./models');
const errorHandler = require('./middlewares/errorHandler');
const restauranteRoutes = require('./routes/restauranteRoutes'); // Archivo que sí existe

dotenv.config();

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/restaurantes', restauranteRoutes);

// Manejo de errores
app.use(errorHandler);

// Sincronización de la base de datos y arranque del servidor
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa.');
    return db.sequelize.sync({ force: false }); // Sincroniza los modelos con la base de datos
  })
  .then(() => {
    console.log('Base de datos sincronizada correctamente.');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });

module.exports = app;
