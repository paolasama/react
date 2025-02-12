const express = require('express');
const router = express.Router();
const restauranteController = require('../controllers/restauranteController');

// Definición de rutas
router.get('/', restauranteController.getAllRestaurantes);
router.get('/:id', restauranteController.getRestauranteById);
router.post('/', restauranteController.createRestaurante);
router.put('/:id', restauranteController.updateRestaurante);
router.delete('/:id', restauranteController.deleteRestaurante);

module.exports = router;