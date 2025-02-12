const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('easyorderv2', 'easyorderv2', '0123456', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("✅ Conexión establecida con PostgreSQL");
    } catch (error) {
        console.error("❌ Error de conexión:", error);
    }
}

testConnection();
