require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/db');
const cors = require('cors');
const { syncModels } = require('./models/index');

const app = express();

app.set('etag', false);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Deshabilitar caché durante el desarrollo
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// Importar rutas
const restauranteRoutes = require('./routes/restauranteRoutes');
const sucursalRoutes = require('./routes/sucursalRoutes');
const mesasRoutes = require('./routes/mesasRoutes');

app.use('/api/restaurantes', restauranteRoutes);
app.use('/api/sucursales', sucursalRoutes);
app.use('/api/mesas', mesasRoutes);

async function startServer() {
  try {
    await connectDB();
    await syncModels();
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