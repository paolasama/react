const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const Mesa = sequelize.define('Mesa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_restaurante: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'mesas',
  timestamps: true
});

module.exports = Mesa;