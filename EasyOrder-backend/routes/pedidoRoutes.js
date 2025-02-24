   // EasyOrder-backend/routes/pedidoRoutes.js
   const { Router } = require('express');
   const router = Router();

   // Ejemplo de ruta para obtener pedidos
   router.get('/', (req, res) => {
     // Lógica para obtener pedidos
     res.send('Lista de pedidos');
   });

   module.exports = router;