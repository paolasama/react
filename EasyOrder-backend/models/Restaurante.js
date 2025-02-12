const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Restaurante = sequelize.define('Restaurante', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'restaurantes', // Asegúrate de que coincide con la base de datos
    timestamps: true
});

module.exports = Restaurante;