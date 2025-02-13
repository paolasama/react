const path = require('path');
const envPath = path.resolve(__dirname, '../.env');
console.log('Cargando variables de entorno desde:', envPath);

const dotenvResult = require('dotenv').config({ path: envPath });
if (dotenvResult.error) {
  console.error('Error al cargar .env:', dotenvResult.error);
  process.exit(1);
}

console.log("Variables cargadas:", {
  USE_DUMMY_DB: process.env.USE_DUMMY_DB,
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING
});

const { Sequelize } = require('sequelize');

if (!process.env.DB_CONNECTION_STRING) {
  throw new Error("La variable DB_CONNECTION_STRING no está definida en .env");
}

let sequelize;
if (process.env.USE_DUMMY_DB === 'true') {
  // Modo dummy: simulación en memoria (no se conectará a una base de datos real)
  sequelize = {
    authenticate: async () => {
      console.log('Dummy DB: authenticate OK');
    }
  };
} else {
  console.log("Conectando a PostgreSQL con:", process.env.DB_CONNECTION_STRING);
  // Conexión real a PostgreSQL usando la cadena definida en .env
  sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, { logging: false });
}

// Función para crear la base de datos si no existe (se ejecuta en tiempo real)
let createDatabaseIfNotExists = async () => {};
if (process.env.USE_DUMMY_DB !== 'true') {
  const pgtools = require('pgtools');
  const parse = require('pg-connection-string').parse;
  createDatabaseIfNotExists = async function () {
    const config = parse(process.env.DB_CONNECTION_STRING);
    const dbName = config.database;
    // Para crear la base de datos usamos la conexión a la base 'postgres' (default)
    config.database = 'postgres';
    try {
      await pgtools.createdb(config, dbName);
      console.log(`La base de datos '${dbName}' fue creada exitosamente.`);
    } catch (err) {
      if (
        err.code === "duplicate_database" ||
        err.code === "42P04" ||
        (err.message && (err.message.toLowerCase().includes("ya existe") || err.message.toLowerCase().includes("duplicate")))
      ) {
        console.log(`La base de datos '${dbName}' ya existe.`);
        return;
      } else {
        console.error("Error al crear la base de datos:", err);
        throw err;
      }
    }
  };
}

async function connectDB() {
  if (process.env.USE_DUMMY_DB !== 'true') {
    // Se crea la base de datos si no existe; se envuelve en try/catch para ignorar el error de duplicado.
    try {
      await createDatabaseIfNotExists();
    } catch (err) {
      if (
        err.code === "duplicate_database" ||
        err.code === "42P04" ||
        (err.message && err.message.toLowerCase().includes("ya existe"))
      ) {
        console.log("La base de datos ya existe, continuando con la conexión...");
      } else {
        throw err;
      }
    }
  }
  try {
    await sequelize.authenticate();
    console.log('Base de datos conectada exitosamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error.message, error.stack);
    throw error;
  }
}

module.exports = { sequelize, connectDB };

