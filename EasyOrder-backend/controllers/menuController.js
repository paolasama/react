// controllers/menuController.js
const Menu = require("../models/Menu");
const Sucursal = require("../models/Sucursal");

// GET /api/menus
exports.getMenus = async (req, res) => {
  try {
    const menus = await Menu.findAll({
      include: [
        {
          model: Sucursal,
          as: "sucursal",
          attributes: ["id", "nombre"],
        },
      ],
    });
    res.json(menus);
  } catch (error) {
    console.error("Error al obtener menús:", error);
    res.status(500).json({ error: "Error al obtener menús" });
  }
};

// GET /api/menus/:id
exports.getMenuById = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findByPk(id, {
      include: [
        {
          model: Sucursal,
          as: "sucursal",
          attributes: ["id", "nombre"],
        },
      ],
    });

    if (!menu) {
      return res.status(404).json({ error: "Menú no encontrado" });
    }

    res.json(menu);
  } catch (error) {
    console.error("Error al obtener menú:", error);
    res.status(500).json({ error: "Error al obtener menú" });
  }
};


// POST /api/menus
exports.createMenu = async (req, res) => {
  try {
    const { nombre, activo, restaurante_id, sucursal_id } = req.body;
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

// PUT /api/menus/:id
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

// DELETE /api/menus/:id
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
