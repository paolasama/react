// routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Ruta para obtener todos los menús
router.get('/', menuController.getAllMenus);

// Ruta para obtener un menú por su ID
router.get('/:id', menuController.getMenuById);

// Ruta para crear un nuevo menú
router.post('/', menuController.createMenu);  // Asegúrate de que esté configurada correctamente

// Ruta para actualizar completamente un menú
router.put('/:id', menuController.updateMenu);

// Ruta para actualizar parcialmente un menú
router.patch('/:id', menuController.patchMenu);

module.exports = router;
