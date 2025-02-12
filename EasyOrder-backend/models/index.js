// models/index.js
const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');
const Restaurante = require('./Restaurante'); // Verifica que el nombre de la ruta sea correcto
const Sucursal = require('./Sucursal');
const Mesa = require('./Mesa');

sequelize.sync({ force: false })  // Solo sincroniza, sin eliminar las tablas existentes
  .then(() => console.log('Base de datos sincronizada'))
  .catch((err) => console.error('Error al sincronizar la base de datos:', err));

module.exports = { Restaurante, Sucursal, Mesa };