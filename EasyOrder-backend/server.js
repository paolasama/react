// EasyOrder-backend/server.js
   require('dotenv').config();
   const express = require('express');
   const path = require('path');
   const cors = require('cors');
   const { connectDB } = require('./config/db');
   const { syncModels } = require('./models/index');
   const authRoutes = require('./routes/authRoutes');
   const restauranteRoutes = require('./routes/restauranteRoutes');
   const sucursalRoutes = require('./routes/sucursalRoutes');
   const mesasRoutes = require('./routes/mesasRoutes');
   const menuRoutes = require("./routes/menuRoutes");
   const menuItemRoutes = require("./routes/menuItemRoutes");
   const categoriaRoutes = require("./routes/categoriaRoutes");
   const qrRoutes = require('./routes/qrRoutes'); // Mueve esta línea aquí
   const pedidoRoutes = require('./routes/pedidoRoutes');
   const pagoRoutes = require('./routes/pagoRoutes');
   const sesionRoutes = require('./routes/sesionRoutes');
   const authMiddleware = require('./middlewares/authMiddleware');
   const errorHandler = require('./middlewares/errorHandler');
   const carritoRoutes = require('./routes/carritoRoutes');
   const app = express();

   app.set('etag', false);
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));
   app.use(cors());
   app.use(express.static('uploads'));

   // Deshabilitar caché durante el desarrollo
   app.use((req, res, next) => {
     res.set('Cache-Control', 'no-store');
     next();
   });

   // Rutas
   app.use('/api/auth', authRoutes); // Login y Logout
   app.use('/api/qr', qrRoutes); // Ruta QR
   app.use('/api/restaurantes', restauranteRoutes);
   app.use("/api/sucursales", sucursalRoutes);
   app.use('/api/mesas', mesasRoutes);
   app.use('/api/menus', menuRoutes);
   app.use('/api/menu-items', menuItemRoutes);
   app.use('/api/categorias', categoriaRoutes);
   app.use("/uploads", express.static(path.join(__dirname, "uploads")));
   app.use('/api/carrito', carritoRoutes);

   app.use('/api/pedidos', authMiddleware, pedidoRoutes);
   app.use('/api/pagos', authMiddleware, pagoRoutes);
   app.use('/api/sesiones', authMiddleware, sesionRoutes);

   // Middleware de manejo de errores (debe ir al final, después de las rutas)
   app.use(errorHandler);

   // Función para sembrar datos dummy en caso de que no existan
   async function seedDatabase() {
     try {
       const { Restaurante, Sucursal } = require('./models/index');

       // Verificar si ya existe al menos un Restaurante
       let restaurantes = await Restaurante.findAll();
       if (!restaurantes || restaurantes.length === 0) {
         const nuevoRestaurante = await Restaurante.create({
           nombre: 'Restaurante Dummy',
           direccion: 'Calle Falsa 123',
           activo: true
         });
         console.log('Restaurante dummy creado:', nuevoRestaurante.dataValues);

         // Crear una Sucursal dummy vinculada a ese restaurante
         const nuevaSucursal = await Sucursal.create({
           nombre: 'Sucursal Principal',
           direccion: 'Av. Principal 456',
           restaurante_id: nuevoRestaurante.id,
           activo: true
         });
         console.log('Sucursal dummy creada:', nuevaSucursal.dataValues);
       }
     } catch (error) {
       console.error('Error creando datos dummy:', error);
     }
   }

   async function startServer() {
     try {
       await connectDB();
       await syncModels();
       await seedDatabase();
       const PORT = process.env.PORT || 3000;
       
       // Add error handling for port in use
       const server = app.listen(PORT, () => {
         console.log(`Servidor escuchando en el puerto ${PORT}`);
       }).on('error', (err) => {
         if (err.code === 'EADDRINUSE') {
           console.log(`Puerto ${PORT} está en uso. Intentando con puerto ${PORT + 1}`);
           server.close();
           app.listen(PORT + 1, () => {
             console.log(`Servidor escuchando en el puerto ${PORT + 1}`);
           });
         } else {
           console.error("Error durante el arranque:", err);
           process.exit(1);
         }
       });
     } catch (error) {
       console.error("Error durante el arranque:", error);
       process.exit(1);
     }
   }

   startServer();