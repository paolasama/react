   // EasyOrder-backend/routes/pagoRoutes.js
   const { Router } = require('express');
   const router = Router();

   // Ejemplo de ruta para procesar un pago
   router.post('/', (req, res) => {
     // Lógica para procesar el pago
     res.send('Pago procesado');
   });

   module.exports = router;