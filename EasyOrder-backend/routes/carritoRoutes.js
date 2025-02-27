// EasyOrder-backend/routes/carritoRoutes.js
const express = require("express");
const router = express.Router();
const { sequelize } = require("../config/db");
const { QueryTypes } = require("sequelize");

// GET /api/carrito -> Devuelve todos los ítems con enCarrito = true
router.get("/", async (req, res) => {
  try {
    const items = await sequelize.query(
      "SELECT * FROM menu_items WHERE enCarrito = true", // <--- Solo los enCarrito
      { type: QueryTypes.SELECT }
    );
    res.json(items);
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
});

// POST /api/carrito -> Marca un ítem como enCarrito = true (simula "agregar al carrito")
router.post("/", async (req, res) => {
  try {
    const { id } = req.body; // ID del ítem que quieres poner en el carrito
    await sequelize.query(
      "UPDATE menu_items SET enCarrito = true WHERE id = :id",
      {
        replacements: { id },
        type: QueryTypes.UPDATE,
      }
    );
    res.json({ message: "Ítem marcado como en el carrito" });
  } catch (error) {
    console.error("Error al agregar al carrito:", error);
    res.status(500).json({ error: "Error al agregar al carrito" });
  }
});

// DELETE /api/carrito/:id -> Marca enCarrito = false (simula "quitar del carrito")
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await sequelize.query(
      "UPDATE menu_items SET enCarrito = false WHERE id = :id",
      {
        replacements: { id },
        type: QueryTypes.UPDATE,
      }
    );
    res.json({ message: "Ítem quitado del carrito (simulado)" });
  } catch (error) {
    console.error("Error al eliminar del carrito:", error);
    res.status(500).json({ error: "Error al eliminar del carrito" });
  }
});

module.exports = router;
