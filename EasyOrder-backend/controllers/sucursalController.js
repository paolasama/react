const { Sucursal, Restaurante } = require('../models');

// Obtener todas las sucursales con información del restaurante
exports.getAllSucursales = async (req, res) => {
    try {
        console.log("📌 Obteniendo lista de sucursales...");
        const sucursales = await Sucursal.findAll({
            include: { model: Restaurante, as: 'restaurante', attributes: ['id', 'nombre'] },
        });

        console.log("✅ Sucursales obtenidas:", sucursales);
        res.status(200).json(sucursales);
    } catch (error) {
        console.error("❌ Error al obtener sucursales:", error);
        res.status(500).json({ message: 'Error interno al obtener sucursales', error: error.message });
    }
};

// Crear una nueva sucursal con validación corregida
exports.createSucursal = async (req, res) => {
    try {
        let { nombre, direccion, restauranteId } = req.body;

        // Convertir restauranteId a número
        restauranteId = Number(restauranteId);
        if (!nombre || !direccion || isNaN(restauranteId)) {
            console.error("❌ Error: Datos inválidos.");
            return res.status(400).json({ message: "Todos los campos son obligatorios y restauranteId debe ser un número válido." });
        }

        console.log("📌 Datos recibidos en el backend:", { nombre, direccion, restauranteId });

        // Verificar si el restaurante existe
        const restauranteExiste = await Restaurante.findByPk(restauranteId);
        if (!restauranteExiste) {
            console.error("❌ Error: El restaurante con ID " + restauranteId + " no existe.");
            return res.status(404).json({ message: "El restaurante no existe." });
        }

        // Verificar que no haya una sucursal con el mismo nombre en ese restaurante
        const existente = await Sucursal.findOne({ where: { nombre, restauranteId } });
        if (existente) {
            console.error("❌ Error: Ya existe una sucursal con el nombre '" + nombre + "' en este restaurante.");
            return res.status(400).json({ message: 'Ya existe una sucursal con este nombre en el mismo restaurante' });
        }

        // Crear la sucursal
        const nuevaSucursal = await Sucursal.create({ nombre, direccion, restauranteId });
        console.log("✅ Sucursal creada correctamente:", nuevaSucursal);

        res.status(201).json(nuevaSucursal);
    } catch (error) {
        console.error("❌ Error inesperado al crear la sucursal:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};