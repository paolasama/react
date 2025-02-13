const express = require('express');
const router = express.Router();
const { getAllSucursales, createSucursal } = require('../controllers/sucursalController');

// Definir rutas
router.get('/', getAllSucursales);
router.post('/', createSucursal);

module.exports = router;