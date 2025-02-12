const express = require('express');
const router = express.Router();
const { getMesas } = require('../controllers/mesaController');

router.get('/mesas', getMesas);

module.exports = router;