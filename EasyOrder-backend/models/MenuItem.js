// models/MenuItem.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Categoria = require("./Categoria");

const MenuItem = sequelize.define(
  "MenuItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "menu_items",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Relación: un MenuItem pertenece a una Categoria
MenuItem.belongsTo(Categoria, {
  foreignKey: "categoria_id",
  as: "categoria",
});

module.exports = MenuItem;
