const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Restaurante = sequelize.define(
  "Restaurante",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre del restaurante no puede estar vacío." },
      },
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "restaurantes",
    timestamps: true,    // Crea campos createdAt, updatedAt
    underscored: true,   // Usa formato snake_case en las columnas
  }
);

module.exports = Restaurante;
