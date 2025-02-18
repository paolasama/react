// EasyOrder-backend/controllers/categoriaController.js
const Categoria = require("../models/Categoria");

// Retorna todas las categorías
exports.getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).json({ error: "Error al obtener categorías" });
  }
};

// Crea una nueva categoría
exports.createCategoria = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ error: "El campo nombre es requerido" });
    }
    const nuevaCategoria = await Categoria.create({ nombre });
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    console.error("Error al crear categoría:", error);
    res.status(500).json({ error: "Error al crear categoría" });
  }
};

// Actualiza una categoría
exports.updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const categoria = await Categoria.findByPk(id);
    if (!categoria) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    await categoria.update({ nombre });
    res.json(categoria);
  } catch (error) {
    console.error("Error al actualizar categoría:", error);
    res.status(500).json({ error: "Error al actualizar categoría" });
  }
};

// Elimina una categoría
exports.deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findByPk(id);
    if (!categoria) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    await categoria.destroy();
    res.json({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
    res.status(500).json({ error: "Error al eliminar categoría" });
  }
};