const Mesa = require('../models/Mesa');

// Obtener todas las mesas
const obtenerMesas = async (req, res) => {
  try {
    const mesas = await Mesa.findAll();
    res.status(200).json(mesas);
  } catch (error) {
    console.error('Error al obtener las mesas:', error);
    res.status(500).json({ error: 'Error al obtener las mesas' });
  }
};

// Crear una nueva mesa
const crearMesa = async (req, res) => {
  try {
    const { numeroMesa, estado, codigoQr, capacidad, activo, restauranteId, sucursalId } = req.body;
    const nuevaMesa = await Mesa.create({ 
      numeroMesa, 
      estado, 
      codigoQr, 
      capacidad, 
      activo, 
      restauranteId, 
      sucursalId 
    });
    res.status(201).json(nuevaMesa);
  } catch (error) {
    console.error('Error al crear la mesa:', error);
    res.status(500).json({ error: 'Error al crear la mesa' });
  }
};

module.exports = { obtenerMesas, crearMesa };