// models/Categoria.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Categoria = sequelize.define("Categoria", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "categorias",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

module.exports = Categoria;
