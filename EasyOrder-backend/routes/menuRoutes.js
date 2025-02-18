// routes/menuRoutes.js
const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

// GET /api/menus
router.get("/", menuController.getMenus);

// POST /api/menus
router.post("/", menuController.createMenu);

// PUT /api/menus/:id
router.put("/:id", menuController.updateMenu);

// DELETE /api/menus/:id
router.delete("/:id", menuController.deleteMenu);

module.exports = router;
