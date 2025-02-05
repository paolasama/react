const express = require('express');
const router = express.Router();
const restauranteController = require('../controllers/restauranteController');

// Obtener todos los restaurantes
router.get('/', restauranteController.getAllRestaurantes);

// Obtener un restaurante por ID
router.get('/:id', restauranteController.getRestauranteById);

// Crear un nuevo restaurante
router.post('/', restauranteController.createRestaurante);

// Actualizar completamente un restaurante
router.put('/:id', restauranteController.updateRestaurante);

// Actualizar parcialmente un restaurante
router.patch('/:id', restauranteController.patchRestaurante);

module.exports = router;
