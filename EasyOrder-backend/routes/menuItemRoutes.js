// routes/menuItems.routes.js
const { Router } = require("express");
const multer = require("multer");
const {
  obtenerMenuItems,
  crearMenuItem,
  toggleEstadoMenuItem,
  eliminarMenuItem,
  obtenerMenuItemPorId,
} = require("../controllers/menuItemController");

const router = Router();
const upload = multer({ dest: "uploads/" }); // Ajusta si quieres otra carpeta

// GET: todos
router.get("/", obtenerMenuItems);

// GET: uno por id
router.get("/:id", obtenerMenuItemPorId);

// POST: con imagen
router.post("/", upload.single("imagen"), crearMenuItem);

// PUT: togglear
router.put("/:id/toggle", toggleEstadoMenuItem);

// DELETE
router.delete("/:id", eliminarMenuItem);

module.exports = router;
