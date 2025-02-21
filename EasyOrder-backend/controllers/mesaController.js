// controllers/mesaController.js
const Mesa = require("../models/Mesa");
const Restaurante = require("../models/Restaurante"); // Ajusta si tienes estos modelos
const Sucursal = require("../models/Sucursal");

/**
 * GET /api/mesas
 * Retorna todas las mesas, incluyendo la info de restaurante y sucursal (si las tienes relacionadas).
 */
exports.getMesas = async (req, res) => {
  try {
    const mesas = await Mesa.findAll({
      // Si tienes relaciones definidas, puedes hacer un include
      // include: [
      //   { model: Restaurante, as: "restaurante" },
      //   { model: Sucursal, as: "sucursal" },
      // ],
    });
    res.status(200).json(mesas);
  } catch (error) {
    console.error("❌ Error al obtener mesas:", error);
    res.status(500).json({ error: "Error al obtener las mesas." });
  }
};

/**
 * GET /api/mesas/:id
 * Obtiene una mesa por su ID
 */
exports.getMesaById = async (req, res) => {
  try {
    const { id } = req.params;
    const mesa = await Mesa.findByPk(id, {
      // include si necesitas
      // include: [{ model: Restaurante, as: "restaurante" }, ...]
    });
    if (!mesa) {
      return res.status(404).json({ error: "Mesa no encontrada." });
    }
    res.json(mesa);
  } catch (error) {
    console.error("❌ Error al obtener la mesa:", error);
    res.status(500).json({ error: "Error al obtener la mesa." });
  }
};

/**
 * POST /api/mesas
 * Crea una nueva mesa
 */
exports.createMesa = async (req, res) => {
  try {
    const { numeroMesa, capacidad, estado, activo, restauranteId, sucursalId } = req.body;

    // Validaciones mínimas
    if (!numeroMesa || !capacidad || !estado || !restauranteId || !sucursalId) {
      return res.status(400).json({ error: "Faltan campos requeridos." });
    }

    // Opcional: Verificar que existan restaurante y sucursal
    const restaurante = await Restaurante.findByPk(restauranteId);
    if (!restaurante) {
      return res.status(404).json({ error: "Restaurante no encontrado." });
    }
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

    // Manejo de error por constraint única, si la tienes
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        error: "Ya existe una mesa con ese número para ese restaurante y sucursal.",
      });
    }

    res.status(500).json({ error: "Error al registrar la mesa" });
  }
};

/**
 * PUT /api/mesas/:id
 * Actualiza los campos de una mesa existente
 */
exports.updateMesa = async (req, res) => {
  try {
    const { id } = req.params;
    const { numeroMesa, capacidad, estado, activo, restauranteId, sucursalId } = req.body;

    // Buscar la mesa
    const mesa = await Mesa.findByPk(id);
    if (!mesa) {
      return res.status(404).json({ error: "Mesa no encontrada." });
    }

    // Opcional: Verificar si restaurante y sucursal existen (si se van a cambiar)
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

    // Actualizar campos
    await mesa.update({
      numero_mesa: numeroMesa,
      capacidad,
      estado,
      activo,
      restaurante_id: restauranteId,
      sucursal_id: sucursalId,
    });

    res.json({ mensaje: "Mesa actualizada correctamente.", mesa });
  } catch (error) {
    console.error("❌ Error al actualizar la mesa:", error);
    res.status(500).json({ error: "Error al actualizar la mesa." });
  }
};

/**
 * PUT /api/mesas/:id/toggle
 * Alterna el campo 'activo' de la mesa
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
