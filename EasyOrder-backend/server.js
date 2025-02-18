require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const { syncModels } = require('./models/index');

const app = express();

app.set('etag', false);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('uploads'));

// Deshabilitar caché durante el desarrollo
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// Importar rutas
const restauranteRoutes = require('./routes/restauranteRoutes');
const sucursalRoutes = require('./routes/sucursalRoutes');
const mesasRoutes = require('./routes/mesasRoutes');
const menuRoutes = require("./routes/menuRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");

app.use('/api/restaurantes', restauranteRoutes);
app.use('/api/sucursales', sucursalRoutes);
app.use('/api/mesas', mesasRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/menu-items', menuItemRoutes);

// Función para sembrar datos dummy en caso de que no existan
async function seedDatabase() {
  try {
    const { Restaurante, Sucursal } = require('./models/index');

    // Verificar si ya existe al menos un Restaurante
    let restaurantes = await Restaurante.findAll();
    if (!restaurantes || restaurantes.length === 0) {
      const nuevoRestaurante = await Restaurante.create({
        nombre: 'Restaurante Dummy',
        direccion: 'Calle Falsa 123',
        activo: true
      });
      console.log('Restaurante dummy creado:', nuevoRestaurante.dataValues);

      // Crear una Sucursal dummy vinculada a ese restaurante
      const nuevaSucursal = await Sucursal.create({
        nombre: 'Sucursal Principal',
        direccion: 'Av. Principal 456',
        restaurante_id: nuevoRestaurante.id,
        activo: true
      });
      console.log('Sucursal dummy creada:', nuevaSucursal.dataValues);
    }
  } catch (error) {
    console.error('Error creando datos dummy:', error);
  }
}

async function startServer() {
  try {
    await connectDB();
    await syncModels();
    await seedDatabase();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error durante el arranque:", error);
    process.exit(1);
  }
}

startServer();
