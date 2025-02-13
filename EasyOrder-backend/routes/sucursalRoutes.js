const express = require('express');
const router = express.Router();
const { getAllSucursales, createSucursal } = require('../controllers/sucursalController');
const Mesa = require('../models/Mesa');

// Ruta para obtener todas las sucursales
router.get('/', getAllSucursales);

// Ruta para crear una sucursal
router.post('/', createSucursal);

// Ruta GET para obtener todas las mesas
router.get('/mesas', async (req, res) => {
  try {
    const mesas = await Mesa.findAll();
    res.status(200).json(mesas);
  } catch (error) {
    console.error('Error al obtener las mesas:', error);
    res.status(500).json({ error: 'Error al obtener las mesas' });
  }
});

// Ruta POST para crear una nueva mesa
router.post('/mesas', async (req, res) => {
  try {
    // Se espera que el payload tenga estas claves en camelCase:
    // numeroMesa, estado, codigoQr, capacidad, activo, restauranteId, sucursalId
    let { numeroMesa, estado, codigoQr, capacidad, activo, restauranteId, sucursalId } = req.body;
    
    // Convertir el valor de capacidad si es cadena
    capacidad = Number(capacidad);

    // Si 'activo' no se envía, lo omitimos para usar el valor por defecto definido en el modelo
    const data = { numeroMesa, estado, codigoQr, capacidad, restauranteId, sucursalId };
    if (activo !== undefined) {
      data.activo = activo;
    }
    
    const nuevaMesa = await Mesa.create(data);
    res.status(201).json(nuevaMesa);
  } catch (error) {
    console.error('Error al crear la mesa:', error);
    res.status(500).json({ error: 'Error al crear la mesa' });
  }
});

module.exports = router;