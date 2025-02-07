require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const restauranteRoutes = require('./routes/restauranteRoutes');
const sucursalRoutes = require('./routes/sucursalRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/restaurantes', restauranteRoutes);
app.use('/api/sucursales', sucursalRoutes);

module.exports = app;
