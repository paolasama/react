// Importamos la conexión a la base de datos
const { sequelize } = require('../config/db');

// Importamos los modelos
const Restaurante = require('./Restaurante');
const Sucursal = require('./Sucursal');

// Verificamos que los modelos estén correctamente definidos antes de continuar
if (!Restaurante || !Sucursal) {
    console.error("❌ Error: Alguno de los modelos no está definido correctamente.");
    process.exit(1); // Finaliza el proceso si hay un problema con los modelos
}

// 📌 Definimos las asociaciones entre los modelos

// Un restaurante puede tener muchas sucursales
Restaurante.hasMany(Sucursal, {
    foreignKey: 'restauranteId', // Campo que conecta con el restaurante en la tabla de sucursales
    onDelete: 'CASCADE', // Si un restaurante se elimina, se eliminan sus sucursales
});

// Una sucursal pertenece a un restaurante
Sucursal.belongsTo(Restaurante, {
    foreignKey: 'restauranteId', // Campo que referencia al restaurante en la tabla de sucursales
});

console.log("✅ Relaciones entre modelos establecidas correctamente");

// Exportamos la conexión y los modelos para usarlos en otras partes del proyecto
module.exports = { sequelize, Restaurante, Sucursal };
