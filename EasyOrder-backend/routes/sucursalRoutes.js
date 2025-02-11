const express = require('express');
const router = express.Router();
const sucursalController = require('../controllers/sucursalController');

// Definir rutas
router.get('/', sucursalController.getAllSucursales);
router.post('/', sucursalController.createSucursal);

module.exports = router;
