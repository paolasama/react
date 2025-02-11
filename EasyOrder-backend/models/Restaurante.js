// Importamos DataTypes desde Sequelize para definir los tipos de datos de cada campo
const { DataTypes } = require('sequelize');

// Importamos la instancia de conexión a la base de datos desde el archivo de configuración
const { sequelize } = require('../config/db');

// Definimos el modelo "Restaurante" utilizando sequelize.define()
const Restaurante = sequelize.define(
    'Restaurante', // Nombre del modelo
    {
        // Definimos la columna "id", que será la clave primaria
        id: {
            type: DataTypes.INTEGER, // Tipo de dato: Entero
            autoIncrement: true, // Se incrementará automáticamente
            primaryKey: true, // Es la clave primaria de la tabla
        },

        // Definimos la columna "nombre" del restaurante
        nombre: {
            type: DataTypes.STRING, // Tipo de dato: Cadena de texto (String)
            allowNull: false, // No permite valores nulos (obligatorio)
            validate: {
                notEmpty: true, // No permite que el campo esté vacío
            },
        },

        // Definimos la columna "direccion" del restaurante
        direccion: {
            type: DataTypes.STRING, // Tipo de dato: Cadena de texto (String)
            allowNull: false, // No permite valores nulos (obligatorio)
            validate: {
                notEmpty: true, // No permite que el campo esté vacío
            },
        },
    },
    {
        // Opciones adicionales del modelo

        tableName: 'restaurantes', // Nombre exacto de la tabla en la base de datos

        timestamps: true, // Agrega automáticamente las columnas "createdAt" y "updatedAt"
    }
);

// Exportamos el modelo para poder usarlo en otras partes del proyecto
module.exports = Restaurante;
