   // EasyOrder-backend/routes/authRoutes.js
   const { Router } = require('express');
   const router = Router();

   // Ejemplo de ruta de login
   router.post('/login', (req, res) => {
     // Lógica de autenticación
     res.send('Login exitoso');
   });

   // Ejemplo de ruta de logout
   router.post('/logout', (req, res) => {
     // Lógica de cierre de sesión
     res.send('Logout exitoso');
   });

   module.exports = router;