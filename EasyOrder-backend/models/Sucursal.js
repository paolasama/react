const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Restaurante = require('./Restaurante');

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
        field: 'restaurante_id', // 🔹 Asegura que se usa el nombre correcto en la BD
        references: {
            model: 'restaurantes', // ⚠️ Asegúrate de que coincide con la BD
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'creado_en' // 🔹 Mapea `createdAt` a `creado_en`
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'actualizado_en' // 🔹 Mapea `updatedAt` a `actualizado_en`
    }
}, {
    tableName: 'sucursales', // ⚠️ Asegúrate de que coincide con la base de datos
    timestamps: true // Activa timestamps para que Sequelize maneje correctamente los nombres personalizados
});

Sucursal.belongsTo(Restaurante, { foreignKey: 'restauranteId', as: 'restaurante' });

module.exports = Sucursal;
