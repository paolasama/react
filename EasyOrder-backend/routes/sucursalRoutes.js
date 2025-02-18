const express = require("express");
const router = express.Router();
const sucursalController = require("../controllers/sucursalController");

// Definir rutas
router.get("/", sucursalController.getAllSucursales);
router.post("/", sucursalController.createSucursal);
router.put("/:id", sucursalController.updateSucursal);
router.delete("/:id", sucursalController.deleteSucursal);

module.exports = router;
