const { Restaurante } = require('../models');

// Obtener todos los restaurantes
exports.getAllRestaurantes = async (req, res, next) => {
    try {
        const restaurantes = await Restaurante.findAll();
        res.status(200).json(restaurantes);
    } catch (error) {
        console.error('❌ Error en getAllRestaurantes:', error);
        res.status(500).json({ message: "Error al obtener restaurantes", error });
    }
};

// Obtener un restaurante por ID
exports.getRestauranteById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const restaurante = await Restaurante.findByPk(id);

        if (!restaurante) {
            return res.status(404).json({ message: 'Restaurante no encontrado' });
        }

        res.status(200).json(restaurante);
    } catch (error) {
        console.error('❌ Error en getRestauranteById:', error);
        res.status(500).json({ message: "Error al obtener el restaurante", error });
    }
};

// Crear un nuevo restaurante
exports.createRestaurante = async (req, res, next) => {
    try {
        console.log("📩 Datos recibidos en la API:", req.body);

        const { nombre, direccion, activo } = req.body;

        if (!nombre || !direccion) {
            console.log("⚠️ Error: Campos obligatorios faltantes.");
            return res.status(400).json({ message: 'Los campos nombre y dirección son obligatorios.' });
        }

        const nuevoRestaurante = await Restaurante.create({
            nombre,
            direccion,
            activo: activo ?? true,
        });

        console.log("✅ Restaurante creado:", nuevoRestaurante);
        res.status(201).json(nuevoRestaurante);
    } catch (error) {
        console.error('❌ Error en createRestaurante:', error);
        res.status(500).json({ message: "Error interno del servidor", error });
    }
};

// Actualizar un restaurante
exports.updateRestaurante = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, direccion, activo } = req.body;

        const restaurante = await Restaurante.findByPk(id);
        if (!restaurante) {
            return res.status(404).json({ message: 'Restaurante no encontrado' });
        }

        await restaurante.update({ nombre, direccion, activo });

        res.status(200).json({ message: 'Restaurante actualizado correctamente', restaurante });
    } catch (error) {
        console.error('❌ Error en updateRestaurante:', error);
        res.status(500).json({ message: "Error al actualizar el restaurante", error });
    }
};

// Eliminar un restaurante
exports.deleteRestaurante = async (req, res, next) => {
    try {
        const { id } = req.params;

        const restaurante = await Restaurante.findByPk(id);
        if (!restaurante) {
            return res.status(404).json({ message: 'Restaurante no encontrado' });
        }

        await restaurante.destroy();
        res.status(200).json({ message: 'Restaurante eliminado correctamente' });
    } catch (error) {
        console.error('❌ Error en deleteRestaurante:', error);
        res.status(500).json({ message: "Error al eliminar el restaurante", error });
    }
};