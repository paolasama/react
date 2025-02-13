require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'easyorderv2',
  username: 'postgres',
  password: '210202',
  host: 'localhost',
  dialect: 'postgres',
  port: 5432
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Base de datos conectada exitosamente.');
    await sequelize.sync();
    console.log('Tablas sincronizadas.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error.message, error.stack);
    throw error;
  }
}

module.exports = { sequelize, connectDB };

