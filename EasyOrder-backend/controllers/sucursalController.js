const { Sucursal, Restaurante } = require("../models");

// ✅ Obtener todas las sucursales
exports.getAllSucursales = async (req, res) => {
  try {
    const sucursales = await Sucursal.findAll({
      include: [
        {
          model: Restaurante,
          as: "restaurante",
          attributes: ["id", "nombre"],
        },
      ],
    });

    if (!sucursales.length) {
      return res.status(404).json({ error: "No hay sucursales registradas." });
    }

    res.json(sucursales);
  } catch (error) {
    console.error("❌ Error al obtener sucursales:", error.message);
    res.status(500).json({ error: "Error al obtener las sucursales." });
  }
};

// ✅ Obtener una sucursal por ID
exports.getSucursalById = async (req, res) => {
  try {
    const { id } = req.params;
    const sucursal = await Sucursal.findByPk(id, {
      include: [
        {
          model: Restaurante,
          as: "restaurante",
          attributes: ["id", "nombre"],
        },
      ],
    });

    if (!sucursal) {
      return res.status(404).json({ error: "Sucursal no encontrada." });
    }

    res.json(sucursal);
  } catch (error) {
    console.error("❌ Error al obtener la sucursal:", error.message);
    res.status(500).json({ error: "Error al obtener la sucursal." });
  }
};

// ✅ Crear una nueva sucursal
exports.createSucursal = async (req, res) => {
  try {
    console.log("📢 Datos recibidos para crear sucursal:", req.body);
    const { nombre, direccion, restaurante_id } = req.body;

    if (!nombre || !direccion || !restaurante_id) {
      return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    const nuevaSucursal = await Sucursal.create({
      nombre,
      direccion,
      restaurante_id,
    });

    console.log("✅ Sucursal creada:", nuevaSucursal);
    res.status(201).json(nuevaSucursal);
  } catch (error) {
    console.error("❌ Error al crear sucursal:", error.message);
    res.status(500).json({ error: "Error al crear la sucursal." });
  }
};

// ✅ Actualizar una sucursal
exports.updateSucursal = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, direccion, activo, restaurante_id } = req.body;

    const sucursal = await Sucursal.findByPk(id);
    if (!sucursal) {
      return res.status(404).json({ error: "Sucursal no encontrada." });
    }

    await sucursal.update({
      nombre,
      direccion,
      activo,
      restaurante_id,
    });

    res.json({ mensaje: "Sucursal actualizada correctamente." });
  } catch (error) {
    console.error("❌ Error al actualizar la sucursal:", error.message);
    res.status(500).json({ error: "Error al actualizar la sucursal." });
  }
};

// ✅ Eliminar una sucursal
exports.deleteSucursal = async (req, res) => {
  try {
    const { id } = req.params;
    const sucursal = await Sucursal.findByPk(id);
    if (!sucursal) {
      return res.status(404).json({ error: "Sucursal no encontrada." });
    }

    await sucursal.destroy();
    res.json({ mensaje: "Sucursal eliminada correctamente." });
  } catch (error) {
    console.error("❌ Error al eliminar la sucursal:", error.message);
    res.status(500).json({ error: "Error al eliminar la sucursal." });
  }
};
