// backend/controllers/mesa.controller.js
const Mesa = require("../models/Mesa");
const Restaurante = require("../models/Restaurante");
const Sucursal = require("../models/Sucursal");

/**
 * GET /api/mesas
 * Retorna todas las mesas, incluyendo la info de restaurante y sucursal
 */
exports.getMesas = async (req, res) => {
  try {
    const mesas = await Mesa.findAll({
      include: [
        {
          model: Restaurante,
          as: "restaurante",
          attributes: ["id", "nombre"],
        },
        {
          model: Sucursal,
          as: "sucursal",
          attributes: ["id", "nombre"],
        },
      ],
    });
    res.status(200).json(mesas);
  } catch (error) {
    console.error("❌ Error al obtener mesas:", error);
    res.status(500).json({ error: "Error al obtener las mesas." });
  }
};

/**
 * POST /api/mesas
 * Body esperado:
 * {
 *   "numeroMesa": <num>,
 *   "capacidad": <num>,
 *   "estado": "Libre" | "Ocupada" | "Reservada",
 *   "activo": <bool>,
 *   "restauranteId": <num>,
 *   "sucursalId": <num>
 * }
 */
exports.createMesa = async (req, res) => {
  try {
    const { numeroMesa, capacidad, estado, activo, restauranteId, sucursalId } = req.body;

    if (!numeroMesa || !capacidad || !estado || !restauranteId || !sucursalId) {
      return res.status(400).json({ error: "Faltan campos requeridos." });
    }

    // Verificar si el restaurante existe
    const restaurante = await Restaurante.findByPk(restauranteId);
    if (!restaurante) {
      return res.status(404).json({ error: "Restaurante no encontrado." });
    }

    // Verificar si la sucursal existe
    const sucursal = await Sucursal.findByPk(sucursalId);
    if (!sucursal) {
      return res.status(404).json({ error: "Sucursal no encontrada." });
    }

    // Crear la mesa
    const nuevaMesa = await Mesa.create({
      numero_mesa: numeroMesa,
      capacidad,
      estado,
      activo: activo ?? true,
      restaurante_id: restauranteId,
      sucursal_id: sucursalId,
    });

    res.status(201).json({
      mensaje: "Mesa creada exitosamente.",
      mesa: nuevaMesa,
    });
  } catch (error) {
    console.error("❌ Error al registrar la mesa:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ error: "Ya existe una mesa con ese número para ese restaurante y sucursal." });
    }
    res.status(500).json({ error: "Error al registrar la mesa" });
  }
};

/**
 * PUT /api/mesas/:id
 * Actualiza la mesa, incluyendo restauranteId y sucursalId
 */
exports.updateMesa = async (req, res) => {
  try {
    const { id } = req.params;
    const { numeroMesa, capacidad, estado, activo, restauranteId, sucursalId } = req.body;

    const mesa = await Mesa.findByPk(id);
    if (!mesa) {
      return res.status(404).json({ error: "Mesa no encontrada." });
    }

    // Opcional: Verificar si restaurante y sucursal existen
    if (restauranteId) {
      const restaurante = await Restaurante.findByPk(restauranteId);
      if (!restaurante) {
        return res.status(404).json({ error: "Restaurante no encontrado." });
      }
    }
    if (sucursalId) {
      const sucursal = await Sucursal.findByPk(sucursalId);
      if (!sucursal) {
        return res.status(404).json({ error: "Sucursal no encontrada." });
      }
    }

    await mesa.update({
      numero_mesa: numeroMesa,
      capacidad,
      estado,
      activo,
      restaurante_id: restauranteId,
      sucursal_id: sucursalId,
    });

    res.json({ mensaje: "Mesa actualizada correctamente." });
  } catch (error) {
    console.error("❌ Error al actualizar la mesa:", error);
    res.status(500).json({ error: "Error al actualizar la mesa." });
  }
};

/**
 * PUT /api/mesas/:id/toggle
 * Alterna el campo activo
 */
exports.toggleMesa = async (req, res) => {
  try {
    const { id } = req.params;
    const mesa = await Mesa.findByPk(id);
    if (!mesa) {
      return res.status(404).json({ error: "Mesa no encontrada." });
    }
    mesa.activo = !mesa.activo;
    await mesa.save();

    res.json({ mensaje: "Estado de la mesa actualizado correctamente.", mesa });
  } catch (error) {
    console.error("❌ Error al cambiar estado de la mesa:", error);
    res.status(500).json({ error: "Error al cambiar estado de la mesa." });
  }
};

/**
 * DELETE /api/mesas/:id
 * Elimina la mesa
 */
exports.deleteMesa = async (req, res) => {
  try {
    const { id } = req.params;
    const mesa = await Mesa.findByPk(id);
    if (!mesa) {
      return res.status(404).json({ error: "Mesa no encontrada." });
    }
    await mesa.destroy();
    res.json({ mensaje: "Mesa eliminada correctamente." });
  } catch (error) {
    console.error("❌ Error al eliminar la mesa:", error);
    res.status(500).json({ error: "Error al eliminar la mesa." });
  }
};
