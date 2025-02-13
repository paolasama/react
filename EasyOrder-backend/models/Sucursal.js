const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');
const Restaurante = require('./Restaurante'); // Importa el modelo Restaurante


// Definir el modelo Sucursal
const Sucursal = sequelize.define('Sucursal', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  restaurante_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Restaurante,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'sucursales',
  timestamps: true,
});

// Define la asociación: cada sucursal pertenece a un restaurante
Sucursal.belongsTo(Restaurante, { foreignKey: 'restaurante_id' });

module.exports = Sucursal;