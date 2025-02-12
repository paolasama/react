const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Restaurante = require('./Restaurante'); // Importa correctamente
const Sucursal = require('./Sucursal');       // Importa correctamente

const Mesa = sequelize.define('Mesa', {
  numero_mesa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codigo_qr: {
    type: DataTypes.STRING,
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: false, // Si no necesitas los campos createdAt y updatedAt
});

Mesa.belongsTo(Restaurante, { foreignKey: 'restaurante_id' });
Mesa.belongsTo(Sucursal, { foreignKey: 'sucursal_id' }); // Relación con Sucursal

module.exports = Mesa;