const Sucursal = require('../models/Sucursal');
const Restaurante = require('../models/Restaurante');

// Obtener todas las sucursales
const getAllSucursales = async (req, res) => {
  try {
    const sucursales = await Sucursal.findAll({
      include: {
        model: Restaurante, // Relacionamos el restaurante
        attributes: ['nombre'], // Solo traeremos el nombre del restaurante
      }
    });
    res.json(sucursales); // Esto enviará las sucursales con la relación Restaurante
  } catch (error) {
    console.error('Error al obtener sucursales:', error);
    res.status(500).json({ error: 'Error al obtener sucursales' });
  }
};

// Crear una nueva sucursal
const createSucursal = async (req, res) => {
  try {
    const { nombre, direccion, activo, restaurante_id } = req.body;
    if (!restaurante_id) {
      return res.status(400).json({ error: 'El campo restaurante_id es obligatorio' });
    }
    const nuevaSucursal = await Sucursal.create({
      nombre,
      direccion,
      activo,
      restaurante_id
    });
    const sucursalConRestaurante = await Sucursal.findByPk(nuevaSucursal.id, {
      include: {
        model: Restaurante,
        attributes: ['nombre'],
      },
    });
    res.status(201).json(sucursalConRestaurante);
  } catch (error) {
    console.error('Error al crear la sucursal:', error);
    res.status(500).json({ error: 'Error al crear la sucursal' });
  }
};

module.exports = {
  getAllSucursales,
  createSucursal,
};