// controllers/menuItems.controller.js
const MenuItem = require("../models/MenuItem");
const Categoria = require("../models/Categoria");

// GET /api/menu-items
const obtenerMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.findAll({
      include: [{ model: Categoria, as: "categoria" }],
    });
    res.json(items);
  } catch (error) {
    console.error("Error al obtener items:", error);
    res.status(500).json({ error: "Error al obtener ítems" });
  }
};

// GET /api/menu-items/:id
const obtenerMenuItemPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await MenuItem.findByPk(id, {
      include: [{ model: Categoria, as: "categoria" }],
    });

    if (!item) {
      // Retornamos un JSON de error
      return res.status(404).json({ error: "MenuItem no encontrado" });
    }

    res.json(item);
  } catch (error) {
    console.error("Error al obtener ítem:", error);
    res.status(500).json({ error: "Error al obtener ítem" });
  }
};

// POST /api/menu-items
const crearMenuItem = async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoriaId, activo } = req.body;
    const file = req.file;
    const imagen = file ? file.filename : null;

    const nuevoItem = await MenuItem.create({
      nombre,
      descripcion,
      precio,
      categoria_id: categoriaId,
      activo: activo === "true",
      imagen,
    });

    res.status(201).json(nuevoItem);
  } catch (error) {
    console.error("Error al crear ítem:", error);
    res.status(500).json({ error: "Error al crear ítem" });
  }
};

// PUT /api/menu-items/:id/toggle
const toggleEstadoMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await MenuItem.findByPk(id);

    if (!item) {
      return res.status(404).json({ error: "MenuItem no encontrado" });
    }

    item.activo = !item.activo;
    await item.save();

    res.json(item);
  } catch (error) {
    console.error("Error al togglear ítem:", error);
    res.status(500).json({ error: "Error al togglear ítem" });
  }
};

// DELETE /api/menu-items/:id
const eliminarMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await MenuItem.findByPk(id);

    if (!item) {
      return res.status(404).json({ error: "MenuItem no encontrado" });
    }

    await item.destroy();
    res.json({ message: "Ítem eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar ítem:", error);
    res.status(500).json({ error: "Error al eliminar ítem" });
  }
};

// Exportar todas las funciones
module.exports = {
  obtenerMenuItems,
  obtenerMenuItemPorId,
  crearMenuItem,
  toggleEstadoMenuItem,
  eliminarMenuItem,
};
