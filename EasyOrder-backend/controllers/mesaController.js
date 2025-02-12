const { sequelize } = require('../config/db'); // Asegúrate de que la ruta sea correcta
const { QueryTypes } = require('sequelize');

exports.getMesas = async (req, res) => {
    try {
        const mesas = await sequelize.query('SELECT * FROM mesas', { type: QueryTypes.SELECT });
        res.status(200).json(mesas);
    } catch (error) {
        console.error('Error al obtener las mesas:', error);
        res.status(500).json({ message: 'Error al obtener las mesas', error });
    }
};