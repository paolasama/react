const express = require('express');
const router = express.Router();

// Controlador de mesas
const { getMesas } = require('../controllers/mesaController');

// Ruta para obtener las mesas
router.get('/mesas', getMesas);

module.exports = router;