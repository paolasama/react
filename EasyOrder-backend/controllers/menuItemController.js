const MenuItem = require("../models/MenuItem");
const Categoria = require("../models/Categoria");

// Obtener todos los items de menú con detalles de categoría
exports.getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.findAll({
      include: [
        {
          model: Categoria,
          as: "Categoria",
          attributes: ["id", "nombre"],
        },
      ],
    });
    return res.status(200).json(menuItems);
  } catch (error) {
    console.error("❌ Error al obtener los items de menú:", error);
    return res.status(500).json({ error: "Error al obtener los items de menú" });
  }
};

// Crear un nuevo item de menú
exports.createMenuItem = async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoriaId, activo } = req.body;
    const imagen = req.file ? req.file.path : null; // Si hay imagen, guardar su URL

    if (!nombre || !precio || !categoriaId) {
      return res.status(400).json({ error: "Faltan campos requeridos." });
    }

    const categoria = await Categoria.findByPk(categoriaId);
    if (!categoria) {
      return res.status(404).json({ error: "Categoría no encontrada." });
    }

    const nuevoMenuItem = await MenuItem.create({
      nombre,
      descripcion,
      precio,
      categoriaId,
      activo: activo ?? true,
      imagen,
    });

    return res.status(201).json(nuevoMenuItem);
  } catch (error) {
    console.error("❌ Error al registrar el item de menú:", error);
    return res.status(500).json({ error: "Error al registrar el item de menú" });
  }
};

// Actualizar un item de menú
exports.updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, categoriaId, activo } = req.body;
    const imagen = req.file ? req.file.path : undefined;

    const menuItem = await MenuItem.findByPk(id);
    if (!menuItem) {
      return res.status(404).json({ error: "Item de menú no encontrado." });
    }

    await menuItem.update({ nombre, descripcion, precio, categoriaId, activo, imagen });

    return res.json({ mensaje: "Item de menú actualizado correctamente." });
  } catch (error) {
    console.error("❌ Error al actualizar el item de menú:", error);
    return res.status(500).json({ error: "Error al actualizar el item de menú" });
  }
};

// Eliminar un item de menú
exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await MenuItem.findByPk(id);
    if (!menuItem) {
      return res.status(404).json({ error: "Item de menú no encontrado." });
    }

    await menuItem.destroy();
    return res.json({ mensaje: "Item de menú eliminado correctamente." });
  } catch (error) {
    console.error("❌ Error al eliminar el item de menú:", error);
    return res.status(500).json({ error: "Error al eliminar el item de menú" });
  }
};
