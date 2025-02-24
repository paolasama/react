   // EasyOrder-backend/routes/qrRoutes.js
   const { Router } = require('express');
   const router = Router();

   // Ejemplo de ruta para generar un QR
   router.get('/generate', (req, res) => {
     // Lógica para generar un código QR
     res.send('Código QR generado');
   });

   module.exports = router;