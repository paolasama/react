const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Sucursal = sequelize.define('Sucursal', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    restauranteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Restaurantes', // Debe coincidir con el nombre del modelo
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
});

module.exports = Sucursal;
