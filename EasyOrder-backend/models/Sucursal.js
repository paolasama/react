// Importamos DataTypes desde Sequelize para definir los tipos de datos de los campos
const { DataTypes } = require('sequelize');

// Importamos la instancia de conexión a la base de datos
const { sequelize } = require('../config/db');

// Importamos el modelo Restaurante, ya que Sucursal pertenece a un Restaurante
const Restaurante = require('./Restaurante');

// Definimos el modelo "Sucursal" utilizando sequelize.define()
const Sucursal = sequelize.define(
    'Sucursal', // Nombre del modelo en Sequelize
    {
        // 📌 ID de la sucursal (clave primaria)
        id: {
            type: DataTypes.INTEGER, // Tipo de dato: Entero
            autoIncrement: true, // Se incrementará automáticamente
            primaryKey: true, // Es la clave primaria de la tabla
        },

        // 📌 Nombre de la sucursal
        nombre: {
            type: DataTypes.STRING, // Tipo de dato: Cadena de texto (String)
            allowNull: false, // No permite valores nulos (obligatorio)
            validate: {
                notEmpty: true, // No permite que el campo esté vacío
            },
        },

        // 📌 Dirección de la sucursal
        direccion: {
            type: DataTypes.STRING, // Tipo de dato: Cadena de texto (String)
            allowNull: false, // No permite valores nulos (obligatorio)
            validate: {
                notEmpty: true, // No permite que el campo esté vacío
            },
        },

        // 📌 Clave foránea que conecta la sucursal con un restaurante
        restauranteId: {
            type: DataTypes.INTEGER, // Tipo de dato: Entero (ID de un restaurante)
            allowNull: false, // No puede ser nulo, cada sucursal debe pertenecer a un restaurante
            field: 'restaurante_id', // Nombre exacto en la base de datos
            references: {
                model: 'restaurantes', // Tabla a la que referencia en la BD
                key: 'id', // Columna clave en la tabla de restaurantes
            },
            onDelete: 'CASCADE', // Si se borra un restaurante, sus sucursales también se eliminan
        },

        // 📌 Fechas de creación y actualización personalizadas
        createdAt: {
            type: DataTypes.DATE,
            field: 'creado_en', // Cambia el nombre de la columna a 'creado_en'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'actualizado_en', // Cambia el nombre de la columna a 'actualizado_en'
        },
    },
    {
        tableName: 'sucursales', // Nombre exacto de la tabla en la base de datos
        timestamps: true, // Activa los timestamps para que Sequelize maneje `createdAt` y `updatedAt`
    }
);

// 📌 Definir la relación con Restaurante
Sucursal.belongsTo(Restaurante, {
    foreignKey: 'restauranteId', // Clave foránea en la tabla de sucursales
    as: 'restaurante', // Alias para acceder a la relación
});

// Exportamos el modelo para poder usarlo en otras partes del proyecto
module.exports = Sucursal;
