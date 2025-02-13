const express = require('express');
const router = express.Router();
const Mesa = require('../models/Mesa');

// Ruta GET: obtener todas las mesas
router.get('/', async (req, res) => {
  try {
    const mesas = await Mesa.findAll();
    res.status(200).json(mesas);
  } catch (error) {
    console.error('Error al obtener las mesas:', error);
    res.status(500).json({ error: 'Error al obtener las mesas' });
  }
});

// Ruta POST: crear una nueva mesa
router.post('/', async (req, res) => {
  try {
    // Se espera que el payload tenga estas claves en camelCase:
    // numeroMesa, estado, codigoQr, capacidad, activo, restauranteId, sucursalId
    let { numeroMesa, estado, codigoQr, capacidad, activo, restauranteId, sucursalId } = req.body;
    
    // Si "capacidad" se recibe como string, se convierte a número
    capacidad = Number(capacidad);

    // Construir objeto para insertar; si "activo" no se envía, se usará el valor por defecto
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