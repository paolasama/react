// Archivo: server.js
require('dotenv').config(); // Cargar variables de entorno desde .env
const app = require('./app');
const db = require('./models');

(async () => {
    try {
        console.log('🔍 Conectando a la base de datos...');
        await db.sequelize.authenticate();
        console.log('✅ Conexión exitosa a la base de datos.');

        console.log('🔄 Sincronizando modelos...');
        await db.sequelize.sync({ alter: true }); // Sincroniza sin perder datos
        console.log('✅ Base de datos sincronizada correctamente.');

        // Verificar que la aplicación está correctamente configurada
        if (!app) {
            throw new Error("❌ Error: La instancia de Express no está definida.");
        }

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error al iniciar la aplicación:', error.message);
        process.exit(1);
    }
})();