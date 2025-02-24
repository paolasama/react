   // EasyOrder-backend/routes/sesionRoutes.js
   const { Router } = require('express');
   const router = Router();

   // Ejemplo de ruta para manejar sesiones
   router.post('/login', (req, res) => {
     // Lógica para iniciar sesión
     res.send('Inicio de sesión exitoso');
   });

   router.post('/logout', (req, res) => {
     // Lógica para cerrar sesión
     res.send('Cierre de sesión exitoso');
   });

   module.exports = router;