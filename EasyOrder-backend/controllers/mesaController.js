// controllers/mesasController.js
const { Mesa } = require('../models'); // Asegúrate de que el modelo de Mesa esté importado

const obtenerMesas = async (req, res) => {
  try {
    const mesas = await Mesa.findAll(); // Obtiene todas las mesas
    res.status(200).json(mesas); // Devuelve las mesas en formato JSON
  } catch (error) {
    console.error('Error al obtener las mesas:', error); // Registra el error
    res.status(500).json({ error: 'Error al obtener las mesas' }); // En caso de error
  }
};

module.exports = { obtenerMesas };
