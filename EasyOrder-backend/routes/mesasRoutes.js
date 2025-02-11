// routes/mesasRoutes.js
const express = require('express');
const router = express.Router();
const mesasController = require('../controllers/mesasController');  // Verifica que esta ruta sea correcta

// Ruta para obtener todas las mesas
router.get('/mesas', mesasController.obtenerMesas);

module.exports = router;
