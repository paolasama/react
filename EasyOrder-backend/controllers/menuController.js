// controllers/menuController.js
const db = require('../models');

// Crear un nuevo menú
const createMenu = async (req, res) => {
  const { nombre, descripcion, activo } = req.body;
  try {
    const newMenu = await db.Menu.create({ nombre, descripcion, activo });
    res.status(201).json(newMenu); // Responde con el nuevo menú creado
  } catch (error) {
    console.error('Error al crear el menú:', error);
    res.status(500).json({ message: 'Error al crear el menú' });
  }
};

module.exports = {
  createMenu,
};
