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

// Obtiene todas las mesas
router.get("/", getMesas);

// Obtiene una mesa por su ID
router.get("/:id", getMesaById);

// Crea una nueva mesa
router.post("/", createMesa);

// Actualiza los datos de una mesa existente
router.put("/:id", updateMesa);

// Alterna el estado 'activo' de una mesa (opcional)
router.put("/:id/toggle", toggleMesa);

// Elimina una mesa
router.delete("/:id", deleteMesa);

module.exports = router;
