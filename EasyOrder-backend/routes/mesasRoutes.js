const express = require('express');
const router = express.Router();
const mesasController = require('../controllers/mesasController');

// Ruta GET para obtener todas las mesas
router.get('/', mesasController.obtenerMesas);

// Ruta POST para crear una nueva mesa
router.post('/', mesasController.crearMesa);

module.exports = router;  // Asegúrate de exportar el router
