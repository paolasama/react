const express = require('express');
const router = express.Router();
const { obtenerRestaurantes, crearRestaurante } = require('../controllers/restauranteController');

// Rutas para restaurantes
router.get('/', obtenerRestaurantes);
router.post('/', crearRestaurante);

module.exports = router;