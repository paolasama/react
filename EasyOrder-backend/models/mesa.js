// backend/models/Mesa.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Restaurante = require("./Restaurante");
const Sucursal = require("./Sucursal");

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
      // No uses 'unique: true' si vas a usar índice compuesto
    },
    estado: {
      type: DataTypes.ENUM("Libre", "Ocupada", "Reservada"),
      defaultValue: "Libre",
    },
    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    // FK a la tabla "restaurantes"
    restaurante_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "restaurantes", // Nombre de la tabla de tu modelo Restaurante
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      allowNull: false, // o true si deseas permitir que sea nulo
    },
    // FK a la tabla "sucursales"
    sucursal_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "sucursales",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      allowNull: false,
    },
  },
  {
    tableName: "mesas",
    timestamps: true,
    underscored: true,
    // Índice único (opcional) para no repetir el mismo número en la misma sucursal y restaurante
    indexes: [
      {
        unique: true,
        fields: ["numero_mesa", "restaurante_id", "sucursal_id"],
        name: "unique_numero_mesa_restaurante_sucursal",
      },
    ],
  }
);

// Asociaciones
Restaurante.hasMany(Mesa, {
  foreignKey: "restaurante_id",
  as: "mesasRestaurante",
});
Mesa.belongsTo(Restaurante, {
  foreignKey: "restaurante_id",
  as: "restaurante",
});

Sucursal.hasMany(Mesa, {
  foreignKey: "sucursal_id",
  as: "mesas",
});
Mesa.belongsTo(Sucursal, {
  foreignKey: "sucursal_id",
  as: "sucursal",
});

module.exports = Mesa;
