const { Sucursal } = require('../models');

if (!Sucursal) {
    console.error("❌ Error: El modelo Sucursal no está definido.");
    process.exit(1);
}

exports.getAllSucursales = async (req, res) => {
    try {
        const sucursales = await Sucursal.findAll();
        res.status(200).json(sucursales);
    } catch (error) {
        console.error('Error al obtener sucursales:', error);
        res.status(500).json({ message: 'Error al obtener sucursales', error });
    }
};

exports.getSucursalById = async (req, res) => {
    try {
        const sucursal = await Sucursal.findByPk(req.params.id);
        if (!sucursal) {
            return res.status(404).json({ message: 'Sucursal no encontrada' });
        }
        res.status(200).json(sucursal);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la sucursal', error });
    }
};

exports.createSucursal = async (req, res) => {
    try {
        const nuevaSucursal = await Sucursal.create(req.body);
        res.status(201).json(nuevaSucursal);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la sucursal', error });
    }
};

exports.updateSucursal = async (req, res) => {
    try {
        const [updated] = await Sucursal.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ message: 'Sucursal no encontrada' });
        }
        res.status(200).json({ message: 'Sucursal actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la sucursal', error });
    }
};

exports.patchSucursal = async (req, res) => {
    try {
        const [updated] = await Sucursal.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ message: 'Sucursal no encontrada' });
        }
        res.status(200).json({ message: 'Sucursal actualizada parcialmente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la sucursal', error });
    }
};
