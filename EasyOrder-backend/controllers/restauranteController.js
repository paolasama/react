// controllers/restauranteController.js
const Restaurante = require("../models/Restaurante");

// 1. Obtener todos los restaurantes (GET /api/restaurantes)
exports.getAllRestaurantes = async (req, res) => {
  try {
    const restaurantes = await Restaurante.findAll();
    res.json(restaurantes);
  } catch (error) {
    console.error("❌ Error al obtener restaurantes:", error);
    res.status(500).json({ error: "Error al obtener los restaurantes." });
  }
};

// 2. Obtener un restaurante por ID (GET /api/restaurantes/:id)
exports.getRestauranteById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurante = await Restaurante.findByPk(id);

    if (!restaurante) {
      return res.status(404).json({ error: "Restaurante no encontrado." });
    }

    res.json(restaurante);
  } catch (error) {
    console.error("❌ Error al obtener restaurante:", error);
    res.status(500).json({ error: "Error al obtener el restaurante." });
  }
};

// 3. Crear un restaurante (POST /api/restaurantes)
exports.createRestaurante = async (req, res) => {
  try {
    const { nombre, direccion, activo } = req.body;

    if (!nombre || nombre.trim() === "") {
      return res.status(400).json({ error: "El campo 'nombre' es obligatorio." });
    }

    const nuevoRestaurante = await Restaurante.create({
      nombre,
      direccion: direccion || null,
      activo: activo !== undefined ? activo : true,
    });

    res.status(201).json(nuevoRestaurante);
  } catch (error) {
    console.error("❌ Error al crear restaurante:", error);
    res.status(500).json({ error: "Error al registrar el restaurante." });
  }
};

// 4. Actualizar un restaurante (PUT /api/restaurantes/:id)
exports.updateRestaurante = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, direccion, activo } = req.body;

    // Verificar si el restaurante existe
    const restaurante = await Restaurante.findByPk(id);
    if (!restaurante) {
      return res.status(404).json({ error: "Restaurante no encontrado." });
    }

    // Actualizar los campos
    if (nombre !== undefined) restaurante.nombre = nombre;
    if (direccion !== undefined) restaurante.direccion = direccion;
    if (activo !== undefined) restaurante.activo = activo;

    await restaurante.save(); // Guarda los cambios en la BD

    res.json({
      message: "Restaurante actualizado correctamente.",
      data: restaurante,
    });
  } catch (error) {
    console.error("❌ Error al actualizar restaurante:", error);
    res.status(500).json({ error: "Error al actualizar el restaurante." });
  }
};

// 5. Eliminar un restaurante (DELETE /api/restaurantes/:id)
exports.deleteRestaurante = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el restaurante existe
    const restaurante = await Restaurante.findByPk(id);
    if (!restaurante) {
      return res.status(404).json({ error: "Restaurante no encontrado." });
    }

    // Eliminar el registro
    await restaurante.destroy();

    res.json({ message: "Restaurante eliminado correctamente." });
  } catch (error) {
    console.error("❌ Error al eliminar restaurante:", error);
    res.status(500).json({ error: "Error al eliminar el restaurante." });
  }
};
