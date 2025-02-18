const express = require("express");
const multer = require("multer");
const router = express.Router();
const menuItemController = require("../controllers/menuItemController");

// Configuración de almacenamiento de imágenes con Multer
const upload = multer({ dest: "uploads/" });

router.get("/", menuItemController.getMenuItems);
router.post("/", upload.single("imagen"), menuItemController.createMenuItem);
router.put("/:id", upload.single("imagen"), menuItemController.updateMenuItem);
router.delete("/:id", menuItemController.deleteMenuItem);

module.exports = router;
