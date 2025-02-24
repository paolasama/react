// controllers/menuItems.controller.js
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
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
    console.error("Error al obtener ítems:", error);
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
    let imagen = null;
    const file = req.file; // Multer asigna el archivo a req.file

    if (file) {
      // Obtiene la extensión en minúsculas
      const ext = path.extname(file.originalname).toLowerCase();
      if (ext === ".webp") {
        // Convierte de WebP a PNG usando Sharp
        const newFilename = path.basename(file.originalname, ext) + ".png";
        const newFilePath = path.join(path.dirname(file.path), newFilename);
        await sharp(file.path)
          .png()
          .toFile(newFilePath);
        
        // Elimina el archivo original tras un pequeño retraso
        setTimeout(() => {
          try {
            fs.unlinkSync(file.path);
          } catch (err) {
            console.error("Error al eliminar el archivo original:", err);
          }
        }, 100);
        imagen = newFilename;
      } else {
        imagen = file.filename;
      }
    }

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

    // Alterna el estado de 'activo'
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

    // Si el ítem tiene imagen, elimina el archivo del sistema
    if (item.imagen) {
      const imagePath = path.join(__dirname, "../uploads", item.imagen);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await item.destroy();
    res.json({ message: "Ítem eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar ítem:", error);
    res.status(500).json({ error: "Error al eliminar ítem" });
  }
};

module.exports = {
  obtenerMenuItems,
  obtenerMenuItemPorId,
  crearMenuItem,
  toggleEstadoMenuItem,
  eliminarMenuItem,
};
