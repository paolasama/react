const express = require('express');
const cors = require('cors'); // 🔥 Importar CORS
const app = express();
const { sequelize } = require('./config/db');
const restauranteRoutes = require('./routes/restauranteRoutes');
const sucursalRoutes = require('./routes/sucursalRoutes'); // Importa las rutas de sucursales


// Middleware
app.use(express.json());
app.use(cors()); // 🔥 Permitir solicitudes desde el frontend

// Rutas
app.use('/api/restaurantes', restauranteRoutes);
app.use('/api/sucursales', sucursalRoutes); // <- Esto es clave


// Iniciar servidor
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión establecida con PostgreSQL');

        await sequelize.sync();
        console.log('✅ Base de datos sincronizada');

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

// Llamar a la función para iniciar el servidor
startServer();