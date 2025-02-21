// models/index.js
const { sequelize } = require("../config/db");
const Restaurante = require("./Restaurante"); // Asegúrate de tener este modelo si es necesario
const Sucursal = require("./Sucursal");
const Mesa = require("./Mesa");


// Asociaciones: si usas Restaurante y Sucursal
if (!Restaurante.associations.sucursales) {
  Restaurante.hasMany(Sucursal, {
    foreignKey: "restaurante_id",
    as: "sucursales",
  });
  Sucursal.belongsTo(Restaurante, {
    foreignKey: "restaurante_id",
    as: "restaurante",
  });
}

// Asociación: Sucursal → Mesa
if (!Sucursal.associations.mesas) {
  Sucursal.hasMany(Mesa, {
    foreignKey: "sucursal_id",
    as: "mesas",
  });
  Mesa.belongsTo(Sucursal, {
    foreignKey: "sucursal_id",
    as: "sucursal",
  });
}

async function syncModels() {
  try {
    await sequelize.sync({ force: false });
    console.log("✅ Todos los modelos se sincronizaron correctamente.");
  } catch (error) {
    console.error("❌ Error al sincronizar modelos:", error);
    throw error;
  }
}


module.exports = {
  Restaurante,
  Sucursal,
  Mesa,
  sequelize,
  syncModels,
};
