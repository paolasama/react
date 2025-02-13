const Sucursal = require('../models/Sucursal');
const Restaurante = require('../models/Restaurante');

// Función para obtener todas las sucursales (incluyendo el nombre del restaurante)
const getAllSucursales = async (req, res) => {
  try {
    console.log("Iniciando consulta de sucursales...");
    const sucursales = await Sucursal.findAll({
      include: {
        model: Restaurante,
        attributes: ['nombre'],
      },
    });
    console.log("Sucursales encontradas:", sucursales);
    res.json(sucursales);
  } catch (error) {
    console.error('Error al obtener sucursales:', error.message, error.stack);
    res.status(500).json({ error: error.message });
  }
};

// Función para crear una nueva sucursal
const createSucursal = async (req, res) => {
  try {
    console.log('Contenido de req.body:', req.body);
    const { nombre, direccion, activo, restaurante_id, restauranteId } = req.body;
    const finalRestauranteId = restaurante_id || restauranteId;
    if (!finalRestauranteId) {
      console.log('No se recibió restaurante_id ni restauranteId. req.body:', req.body);
      return res.status(400).json({ error: 'El campo restaurante_id es obligatorio' });
    }
    const nuevaSucursal = await Sucursal.create({
      nombre,
      direccion,
      activo,
      restaurante_id: finalRestauranteId,
    });
    const sucursalConRestaurante = await Sucursal.findByPk(nuevaSucursal.id, {
      include: {
        model: Restaurante,
        attributes: ['nombre'],
      },
    });
    res.status(201).json(sucursalConRestaurante);
  } catch (error) {
    console.error('Error al crear sucursal:', error.message, error.stack);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllSucursales,
  createSucursal,
};