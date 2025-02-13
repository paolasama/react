// models/index.js
const { Sequelize } = require('sequelize');
const { sequelize } = require('../config/db');
const Restaurante = require('./Restaurante'); // Verifica que el nombre de la ruta sea correcto
const Sucursal = require('./Sucursal');
const Mesa = require('./Mesa');

// Requerir los modelos para que se inicialicen (si es necesario)
require('./Restaurante');
require('./Sucursal');

// Definir asociaciones (modo real)
if (process.env.USE_DUMMY_DB !== 'true') {
  Restaurante.hasMany(Sucursal, {
    foreignKey: 'restauranteId',
    as: 'sucursales'
  });
  Sucursal.belongsTo(Restaurante, {
    foreignKey: 'restauranteId',
    as: 'Restaurante'
  });
}

// Sincronización secuencial de modelos: primero Restaurante, luego Sucursal y Mesa (si corresponde)
async function syncModels() {
  try {
    console.log("Sincronizando modelo Restaurante...");
    await Restaurante.sync({ force: true });
    console.log("Restaurante sincronizado correctamente.");

    console.log("Sincronizando modelo Sucursal...");
    await Sucursal.sync({ force: true });
    console.log("Sucursal sincronizada correctamente.");

    console.log("Sincronizando modelo Mesa...");
    await Mesa.sync({ force: true });
    console.log("Mesa sincronizado correctamente.");

    console.log("Todos los modelos se sincronizaron correctamente.");
  } catch (error) {
    console.error("Error al sincronizar modelos:", error);
    throw error;
  }
}

// Se elimina la llamada inmediata a syncModels()
// Ahora se exporta la función para poder invocarla desde server.js

module.exports = { Restaurante, Sucursal, Mesa, sequelize, syncModels };