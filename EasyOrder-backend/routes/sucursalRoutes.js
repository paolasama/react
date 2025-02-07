const express = require('express');
const router = express.Router();
const sucursalController = require('../controllers/sucursalController');

if (!sucursalController) {
    console.error("❌ Error: El controlador de sucursales no está definido.");
    process.exit(1);
}

if (
    typeof sucursalController.getAllSucursales !== 'function' ||
    typeof sucursalController.getSucursalById !== 'function' ||
    typeof sucursalController.createSucursal !== 'function' ||
    typeof sucursalController.updateSucursal !== 'function' ||
    typeof sucursalController.patchSucursal !== 'function'
) {
    console.error("❌ Error: Una o más funciones del controlador de sucursales no están definidas.");
    process.exit(1);
}

// Definir rutas
router.get('/', sucursalController.getAllSucursales);
router.get('/:id', sucursalController.getSucursalById);
router.post('/', sucursalController.createSucursal);
router.put('/:id', sucursalController.updateSucursal);
router.patch('/:id', sucursalController.patchSucursal);

module.exports = router;
