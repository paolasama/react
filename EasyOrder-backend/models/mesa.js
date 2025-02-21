// models/Mesa.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db"); // Asegúrate de tu archivo db.js

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
      defaultValue: "Libre", // o lo que necesites
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
  },
  {
    tableName: "mesas", // Tu tabla en la BD
    timestamps: true,   // Si tienes createdAt y updatedAt
    underscored: true,  // Si quieres que cree columnas con snake_case
  }
);

module.exports = Mesa;
