// controllers/menuItemController.js
const MenuItem = require("../models/MenuItem");
const Categoria = require("../models/Categoria");

// Obtener todos los items
exports.getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.findAll({
      include: [
        {
          model: Categoria,
          as: "categoria",
          attributes: ["id", "nombre"],
        },
      ],
    });
    res.json(items);
  } catch (error) {
    console.error("Error al obtener menu_items:", error);
    res.status(500).json({ error: "Error al obtener menu_items" });
  }
};

// Crear un item
exports.createMenuItem = async (req, res) => {
  try {
    const { nombre, descripcion, precio, activo, imagen, categoria_id } = req.body;
    
    if (!nombre || precio === undefined) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const nuevoItem = await MenuItem.create({
      nombre,
      descripcion,
      precio,
      activo: activo ?? true,
      imagen,
      categoria_id,
    });
    res.status(201).json(nuevoItem);
  } catch (error) {
    console.error("Error al crear menu_item:", error);
    res.status(500).json({ error: "Error al crear menu_item" });
  }
};


// Actualizar un item
exports.updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, activo, imagen, categoria_id } =
      req.body;

    const item = await MenuItem.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: "MenuItem no encontrado" });
    }

    await item.update({
      nombre,
      descripcion,
      precio,
      activo,
      imagen,
      categoria_id,
    });

    res.json(item);
  } catch (error) {
    console.error("Error al actualizar menu_item:", error);
    res.status(500).json({ error: "Error al actualizar menu_item" });
  }
};

// Eliminar un item
exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await MenuItem.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: "MenuItem no encontrado" });
    }
    await item.destroy();
    res.json({ message: "MenuItem eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar menu_item:", error);
    res.status(500).json({ error: "Error al eliminar menu_item" });
  }
};
