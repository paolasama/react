// routes/restauranteRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllRestaurantes,
  getRestauranteById,
  createRestaurante,
  updateRestaurante,
  deleteRestaurante,
} = require('../controllers/restauranteController');

// 1. Obtener todos los restaurantes
router.get('/', getAllRestaurantes);

// 2. Obtener un restaurante por ID
router.get('/:id', getRestauranteById);

// 3. Crear un restaurante
router.post('/', createRestaurante);

// 4. Actualizar un restaurante
router.put('/:id', updateRestaurante);

// 5. Eliminar un restaurante
router.delete('/:id', deleteRestaurante);

module.exports = router;
