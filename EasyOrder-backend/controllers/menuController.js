// controllers/menuController.js
const Menu = require("../models/Menu");
const Sucursal = require("../models/Sucursal");

// Obtener todos los menús
exports.getMenus = async (req, res) => {
  try {
    const menus = await Menu.findAll({
      include: [
        {
          model: Sucursal,
          as: "sucursal",
          attributes: ["id", "nombre"], // si quieres más campos, agrégalos
        },
      ],
    });
    res.json(menus);
  } catch (error) {
    console.error("Error al obtener menús:", error);
    res.status(500).json({ error: "Error al obtener menús" });
  }
};

// Crear un menú
exports.createMenu = async (req, res) => {
  try {
    const { nombre, activo, restaurante_id, sucursal_id } = req.body;

    // Validaciones mínimas
    if (!nombre || !restaurante_id) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const nuevoMenu = await Menu.create({
      nombre,
      activo: activo ?? true,
      restaurante_id,
      sucursal_id,
    });
    res.status(201).json(nuevoMenu);
  } catch (error) {
    console.error("Error al crear menú:", error);
    res.status(500).json({ error: "Error al crear menú" });
  }
};

// Actualizar un menú
exports.updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, activo, restaurante_id, sucursal_id } = req.body;

    const menu = await Menu.findByPk(id);
    if (!menu) {
      return res.status(404).json({ error: "Menú no encontrado" });
    }

    await menu.update({
      nombre,
      activo,
      restaurante_id,
      sucursal_id,
    });

    res.json(menu);
  } catch (error) {
    console.error("Error al actualizar menú:", error);
    res.status(500).json({ error: "Error al actualizar menú" });
  }
};

// Eliminar un menú
exports.deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findByPk(id);
    if (!menu) {
      return res.status(404).json({ error: "Menú no encontrado" });
    }
    await menu.destroy();
    res.json({ message: "Menú eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar menú:", error);
    res.status(500).json({ error: "Error al eliminar menú" });
  }
};
