const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const Mesa = sequelize.define('Mesa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  numeroMesa: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'numero_mesa'
  },
  codigoQr: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'codigo_qr'
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'activo'
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  restauranteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'restaurante_id',
    references: {
      model: 'restaurantes',
      key: 'id'
    }
  },
  sucursalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'sucursal_id',
    references: {
      model: 'sucursales',
      key: 'id'
    }
  }
}, {
  tableName: 'Mesas',
  timestamps: true,
  underscored: true
});

module.exports = Mesa;