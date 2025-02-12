const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('easyorderv2', 'postgres', '0123456', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false, // Evita logs excesivos en consola
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("✅ Conexión establecida con PostgreSQL");

        // Sincronizar modelos sin alterar estructura automáticamente
        await sequelize.sync({ alter: true });
        console.log("✅ Modelos sincronizados correctamente");
    } catch (error) {
        console.error("❌ Error al conectar con la base de datos:", error);
        process.exit(1);
    }
}

// ✅ Exportamos `sequelize` y `connectDB`
module.exports = { sequelize, connectDB };
