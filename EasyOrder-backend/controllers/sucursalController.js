const { Sucursal, Restaurante } = require('../models');

// Función para obtener todas las sucursales (incluyendo el nombre del restaurante)
const getAllSucursales = async (req, res) => {
  try {
    console.log("Iniciando consulta de sucursales...");
    const sucursales = await Sucursal.findAll({
      include: [{
        model: Restaurante,
        as: 'Restaurante',
        attributes: ['nombre']
      }],
      raw: false,
      nest: true
    });
    console.log("Sucursales encontradas:", JSON.stringify(sucursales, null, 2));
    res.json(sucursales);
  } catch (error) {
    console.error("Error al obtener sucursales:", error.message, error.stack);
    res.status(500).json({ error: error.message });
  }
};

// Función para crear una nueva sucursal
const createSucursal = async (req, res) => {
  try {
    console.log("Datos recibidos para crear sucursal:", req.body);
    // Se capturan ambas posibles propiedades: 'restauranteId' y 'restaurante_id'
    const { nombre, direccion, activo, restauranteId, restaurante_id } = req.body;
    // Se utiliza el que tenga valor (priorizando 'restauranteId') y se convierte explícitamente a número
    const rawRestauranteId = restauranteId || restaurante_id;
    const finalRestauranteId = Number(rawRestauranteId);
    
    if (!nombre || nombre.trim() === "") {
      console.error("Falta el campo 'nombre' para la sucursal.");
      return res.status(400).json({ error: "El campo 'nombre' es obligatorio." });
    }
    if (!finalRestauranteId) {
      console.error("Falta el campo 'restauranteId' para la sucursal o no es un número válido.");
      return res.status(400).json({ error: "El campo 'restauranteId' es obligatorio." });
    }
    
    const nuevaSucursal = await Sucursal.create({
      nombre,
      direccion: direccion || null,
      activo: typeof activo === 'boolean' ? activo : true,
      restauranteId: finalRestauranteId
    });
    console.log("Sucursal creada exitosamente:", nuevaSucursal);
    res.status(201).json(nuevaSucursal);
  } catch (error) {
    console.error("Error al crear sucursal:", error.message, error.stack);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllSucursales,
  createSucursal
};