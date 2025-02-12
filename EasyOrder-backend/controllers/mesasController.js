const { Mesa } = require('../models/Mesa');  // Asegúrate de que la ruta y el nombre del archivo sean correctos

// Obtener todas las mesas
const obtenerMesas = async (req, res) => {
  try {
    const mesas = await Mesa.findAll();  // Esto debería funcionar si el modelo está importado correctamente
    res.status(200).json(mesas);
  } catch (error) {
    console.error('Error al obtener las mesas:', error);
    res.status(500).json({ error: 'Error al obtener las mesas' });
  }
};

// Crear una nueva mesa
const crearMesa = async (req, res) => {
  try {
    const { numero_mesa, estado, codigo_qr, capacidad, activo, restaurante_id, sucursal_id } = req.body;
    const nuevaMesa = await Mesa.create({ numero_mesa, estado, codigo_qr, capacidad, activo, restaurante_id, sucursal_id });
    res.status(201).json(nuevaMesa);
  } catch (error) {
    console.error('Error al crear la mesa:', error);
    res.status(500).json({ error: 'Error al crear la mesa' });
  }
};

module.exports = { obtenerMesas, crearMesa };