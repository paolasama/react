// backend/models/Sucursal.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Sucursal = sequelize.define(
  "Sucursal",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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
    // Si deseas enlazar a "Restaurante":
    // restaurante_id: { type: DataTypes.INTEGER, ... }
  },
  {
    tableName: "sucursales",
    timestamps: true,
    underscored: true,
  }
);

module.exports = Sucursal;
