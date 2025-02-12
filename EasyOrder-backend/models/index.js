const { sequelize } = require('../config/db');
const Restaurante = require('./Restaurante');
const Sucursal = require('./Sucursal');

if (!Restaurante || !Sucursal) {
    console.error('❌ Error: Alguno de los modelos no está definido correctamente.');
    process.exit(1);
}

// Asociaciones entre modelos
Restaurante.hasMany(Sucursal, { foreignKey: 'restauranteId', onDelete: 'CASCADE' });
Sucursal.belongsTo(Restaurante, { foreignKey: 'restauranteId' });

module.exports = { sequelize, Restaurante, Sucursal };