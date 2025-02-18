// EasyOrder-backend/config/db.js
const { Sequelize } = require("sequelize");
require("dotenv").config();

if (!process.env.DB_CONNECTION_STRING) {
  throw new Error("❌ La variable DB_CONNECTION_STRING no está definida en .env");
}

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
  dialect: "postgres",
  logging: false, // cambiar a true para depuración
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Base de datos conectada exitosamente.");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error.message, error.stack);
    throw error;
  }
}

module.exports = { sequelize, connectDB };