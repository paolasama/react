// routes/mesasRoutes.js
const { Router } = require("express");
const {
  getMesas,
  createMesa,
  updateMesa,
  toggleMesa,
  deleteMesa,
} = require("../controllers/mesaController");

const router = Router();

router.get("/", getMesas);
router.post("/", createMesa);
router.put("/:id", updateMesa);
router.put("/:id/toggle", toggleMesa);
router.delete("/:id", deleteMesa);

module.exports = router;
