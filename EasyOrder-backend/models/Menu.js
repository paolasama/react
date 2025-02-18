// models/Menu.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db"); // tu instancia de Sequelize
const Sucursal = require("./Sucursal");

const Menu = sequelize.define(
  "Menu",
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
      allowNull: true,
    },
  },
  {
    tableName: "menus",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Relación opcional: un menú pertenece a una sucursal
Menu.belongsTo(Sucursal, {
  foreignKey: "sucursal_id",
  as: "sucursal",
});

module.exports = Menu;
