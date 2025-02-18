const express = require('express');
const router = express.Router();
const { getAllRestaurantes, createRestaurante } = require('../controllers/restauranteController');

// Ruta para obtener todos los restaurantes
router.get('/', getAllRestaurantes);

// Ruta para crear un restaurante
router.post('/', createRestaurante);


module.exports = router;