const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Categoria = require("./Categoria");

const MenuItem = sequelize.define("MenuItem", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.TEXT },
  precio: { type: DataTypes.FLOAT, allowNull: false },
  activo: { type: DataTypes.BOOLEAN, defaultValue: true },
  imagen: { type: DataTypes.STRING },
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "categorias", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  }
}, {
  tableName: "menu_items",
  timestamps: true,
  underscored: true
});

// Relación: Un ítem pertenece a una categoría
MenuItem.belongsTo(Categoria, { foreignKey: "categoria_id", as: "categoria" });

module.exports = MenuItem;
