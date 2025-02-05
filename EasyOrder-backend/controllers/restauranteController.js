const { Restaurante } = require('../models');

// Obtener todos los restaurantes
exports.getAllRestaurantes = async (req, res, next) => {
  try {
    const restaurantes = await Restaurante.findAll();
    res.status(200).json(restaurantes);
  } catch (error) {
    console.error('Error en getAllRestaurantes:', error);
    next(error); // Pasar error al middleware de manejo de errores
  }
};

// Obtener un restaurante por ID
exports.getRestauranteById = async (req, res, next) => {
  try {
    const { id } = req.params; // Captura el ID de la URL
    console.log('ID recibido:', id); // Debugging

    const restaurante = await Restaurante.findByPk(id);

    if (!restaurante) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }

    res.status(200).json(restaurante);
  } catch (error) {
    console.error('Error en getRestauranteById:', error);
    next(error); // Pasar el error al middleware de manejo de errores
  }
};

// Crear un nuevo restaurante
exports.createRestaurante = async (req, res, next) => {
  try {
    const { nombre, direccion, activo } = req.body;

    if (!nombre || !direccion) {
      return res.status(400).json({ message: 'Los campos nombre y dirección son obligatorios.' });
    }

    const nuevoRestaurante = await Restaurante.create({
      nombre,
      direccion,
      activo: activo ?? true, // Si no se envía, por defecto será true
    });

    res.status(201).json(nuevoRestaurante);
  } catch (error) {
    console.error('Error en createRestaurante:', error);
    next(error); // Pasar el error al middleware de manejo de errores
  }
};

// Actualizar completamente un restaurante
exports.updateRestaurante = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, direccion, activo } = req.body;

    const restaurante = await Restaurante.findByPk(id);

    if (!restaurante) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }

    await restaurante.update({ nombre, direccion, activo });
    res.status(200).json({ message: 'Restaurante actualizado correctamente', restaurante });
  } catch (error) {
    console.error('Error en updateRestaurante:', error);
    next(error); // Pasar el error al middleware de manejo de errores
  }
};

// Actualizar parcialmente un restaurante
exports.patchRestaurante = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const restaurante = await Restaurante.findByPk(id);

    if (!restaurante) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }

    await restaurante.update(updates);
    res.status(200).json({ message: 'Restaurante actualizado parcialmente', restaurante });
  } catch (error) {
    console.error('Error en patchRestaurante:', error);
    next(error); // Pasar el error al middleware de manejo de errores
  }
};
