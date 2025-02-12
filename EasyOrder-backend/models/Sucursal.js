const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Restaurante = require('./Restaurante'); // Importa el modelo Restaurante

// Definir el modelo Sucursal
const Sucursal = sequelize.define('Sucursal', {
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
  restaurante_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Restaurantes',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'Sucursales',  // Nombre correcto de la tabla
  timestamps: false,        // Si no necesitas los campos createdAt y updatedAt
});

// Definir la asociación entre Sucursal y Restaurante
Sucursal.belongsTo(Restaurante, { foreignKey: 'restaurante_id' });

module.exports = Sucursal;