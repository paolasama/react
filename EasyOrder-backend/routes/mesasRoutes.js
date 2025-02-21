// routes/mesasRoutes.js
const { Router } = require("express");
const {
  getMesas,
  getMesaById,
  createMesa,
  updateMesa,
  toggleMesa,
  deleteMesa,
} = require("../controllers/mesaController");

const router = Router();

// GET /api/mesas
router.get("/", getMesas);

// GET /api/mesas/:id
router.get("/:id", getMesaById);

// POST /api/mesas
router.post("/", createMesa);

// PUT /api/mesas/:id
router.put("/:id", updateMesa);

// PUT /api/mesas/:id/toggle (opcional para activar/desactivar)
router.put("/:id/toggle", toggleMesa);

// DELETE /api/mesas/:id
router.delete("/:id", deleteMesa);

module.exports = router;
