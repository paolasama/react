const Restaurante = require("../models/Restaurante");

// ✅ Obtener todos los restaurantes
exports.getAllRestaurantes = async (req, res) => {
  try {
    const restaurantes = await Restaurante.findAll();
    res.json(restaurantes);
  } catch (error) {
    console.error("❌ Error al obtener restaurantes:", error);
    res.status(500).json({ error: "Error al obtener los restaurantes." });
  }
};

// ✅ Crear un restaurante
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
