const Restaurante = require('../models/Restaurante');

const obtenerRestaurantes = async (req, res) => {
  try {
    const restaurantes = await Restaurante.findAll({
      attributes: ['id', 'nombre', 'direccion', 'activo']  // No seleccionar createdAt y updatedAt
    });
    res.json(restaurantes);
  } catch (error) {
    console.error('Error al obtener los restaurantes:', error);
    res.status(500).json({ error: 'Error al obtener los restaurantes' });
  }
};

const crearRestaurante = async (req, res) => {
  try {
    const nuevoRestaurante = await Restaurante.create(req.body);
    res.status(201).json(nuevoRestaurante);
  } catch (error) {
    console.error('Error al crear el restaurante:', error);
    res.status(500).json({ error: 'Error al crear el restaurante' });
  }
};

module.exports = {
  obtenerRestaurantes,
  crearRestaurante,
};