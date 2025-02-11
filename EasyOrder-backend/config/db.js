// config/db.js
const { Sequelize } = require('sequelize');

// Configuración de la conexión a PostgreSQL
const sequelize = new Sequelize('easyorderv2', 'easyorder_user', '210202', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false, // Desactiva los logs de la base de datos en consola
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("✅ Conectado a PostgreSQL");
        await sequelize.sync(); // Sincroniza los modelos con la base de datos
        console.log("✅ Modelos sincronizados");
    } catch (error) {
        console.error("❌ Error en la conexión:", error);
        process.exit(1); // Finaliza el proceso si la conexión falla
    }
}

module.exports = { sequelize, connectDB };
