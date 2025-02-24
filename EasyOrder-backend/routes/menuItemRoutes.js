const { Router } = require("express");
const upload = require("../uploads/uploadConfig");
const {
  obtenerMenuItems,
  crearMenuItem,
  toggleEstadoMenuItem,
  eliminarMenuItem,
  obtenerMenuItemPorId,
} = require("../controllers/menuItemController");

const router = Router();

// GET: obtener todos los ítems
router.get("/", obtenerMenuItems);

// GET: obtener un ítem por id
router.get("/:id", obtenerMenuItemPorId);

// POST: crear un ítem con imagen
// Multer buscará el archivo en el campo "imagen"
router.post("/", upload.single("imagen"), crearMenuItem);

// PUT: togglear estado
router.put("/:id/toggle", toggleEstadoMenuItem);

// DELETE: eliminar un ítem
router.delete("/:id", eliminarMenuItem);

module.exports = router;
