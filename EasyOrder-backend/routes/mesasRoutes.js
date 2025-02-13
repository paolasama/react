const express = require('express');
const router = express.Router();
const Mesa = require('../models/Mesa');

router.get('/', async (req, res) => {
    try {
      const mesas = await Mesa.findAll();
      res.status(200).json(mesas);
    } catch (error) {
      // Temporalmente puedes hacer: console.error(error);
      res.status(500).json({ error: 'Error al obtener las mesas' });
    }
  });

module.exports = router;