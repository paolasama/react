// models/Mesa.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Mesa = sequelize.define(
  "Mesa",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numero_mesa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: "Libre",
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    restaurante_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sucursal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // --------------> Agrega aquí la columna QR
    qr_code: {
      type: DataTypes.STRING,  // o TEXT
      allowNull: true,
    },
  },
  {
    tableName: "mesas",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Mesa;
