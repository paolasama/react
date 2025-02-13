const express = require('express');
const router = express.Router();
const Restaurante = require('../models/Restaurante');

// Endpoint para crear un restaurante
router.post('/', async (req, res) => {
  try {
    const nuevoRestaurante = await Restaurante.create({
      ...req.body,
      activo: true,
    });
    res.status(201).json(nuevoRestaurante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para listar todos los restaurantes
router.get('/', async (req, res) => {
  try {
    const restaurantes = await Restaurante.findAll();
    res.json(restaurantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Función para obtener todos los restaurantes
const getAllRestaurantes = async (req, res) => {
  try {
    console.log("Iniciando consulta de restaurantes...");
    const restaurantes = await Restaurante.findAll();
    console.log("Restaurantes encontrados:", restaurantes);
    res.json(restaurantes);
  } catch (error) {
    console.error("Error al obtener restaurantes:", error.message, error.stack);
    res.status(500).json({ error: error.message });
  }
};

// Función para crear un restaurante
const createRestaurante = async (req, res) => {
  try {
    console.log("Datos recibidos para crear restaurante:", req.body);
    const { nombre, direccion, activo } = req.body;
    if (!nombre || nombre.trim() === "") {
      console.error("Falta el campo 'nombre'.");
      return res.status(400).json({ error: "El campo 'nombre' es obligatorio." });
    }

    const nuevoRestaurante = await Restaurante.create({
      nombre,
      direccion: direccion || null,
      activo: typeof activo === 'boolean' ? activo : true,
    });
    console.log("Restaurante creado exitosamente:", nuevoRestaurante);
    res.status(201).json(nuevoRestaurante);
  } catch (error) {
    console.error("Error al crear restaurante:", error.message, error.stack);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllRestaurantes,
  createRestaurante,
};