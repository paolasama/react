// EasyOrder-backend/routes/mesasRoutes.js
const express = require('express');
const router = express.Router();
const Mesa = require('../models/Mesa');

// Importar modelos para las asociaciones
const { Restaurante, Sucursal } = require('../models/index');

router.get('/', async (req, res) => {
  try {
    const mesas = await Mesa.findAll({
      include: [
        { model: Restaurante, as: 'Restaurante', attributes: ['nombre'] },
        { model: Sucursal, as: 'Sucursal', attributes: ['nombre'] }
      ]
    });
    res.status(200).json(mesas);
  } catch (error) {
    console.error('Error al obtener las mesas:', error);
    res.status(500).json({ error: 'Error al obtener las mesas' });
  }
});

module.exports = router;