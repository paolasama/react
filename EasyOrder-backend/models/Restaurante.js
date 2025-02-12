const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Restaurante = sequelize.define('Restaurante', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'Restaurantes',
  timestamps: true,  // Habilitar timestamps
});

module.exports = Restaurante;