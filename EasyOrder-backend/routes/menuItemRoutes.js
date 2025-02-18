// routes/menuItemRoutes.js
const express = require("express");
const router = express.Router();
const menuItemController = require("../controllers/menuItemController");

// GET todos los items
router.get("/", menuItemController.getMenuItems);

// POST crear item
router.post("/", menuItemController.createMenuItem);

// PUT actualizar item
router.put("/:id", menuItemController.updateMenuItem);

// DELETE eliminar item
router.delete("/:id", menuItemController.deleteMenuItem);

module.exports = router;
