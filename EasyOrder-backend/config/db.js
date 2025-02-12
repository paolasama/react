const { Sequelize } = require('sequelize');
require('dotenv').config();  // Cargar variables de entorno desde el archivo .env

// Usamos las variables de entorno para conectar a la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME,  // Nombre de la base de datos
  process.env.DB_USER,  // Usuario de la base de datos
  process.env.DB_PASSWORD, // Contraseña
  {
    host: process.env.DB_HOST, // Dirección del host
    dialect: 'postgres', // Tipo de base de datos
    port: process.env.DB_PORT, // Puerto
    logging: false, // Desactiva los logs SQL
    ssl: process.env.DB_SSL === 'true' ? true : false // Configura SSL si es necesario
  }
);

module.exports = sequelize;
