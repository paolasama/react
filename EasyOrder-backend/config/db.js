const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('easyorderv2', 'easyorder_user', '210202', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false, // Evita logs excesivos en consola
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("✅ Conexión establecida con PostgreSQL");

        // Sincronizar modelos sin alterar estructura automáticamente
        await sequelize.sync();
        console.log("✅ Modelos sincronizados correctamente");
    } catch (error) {
        console.error("❌ Error al conectar con la base de datos:", error);
        process.exit(1);
    }
}

// ✅ Asegurarse de exportar tanto `sequelize` como `connectDB`
module.exports = { sequelize, connectDB };
