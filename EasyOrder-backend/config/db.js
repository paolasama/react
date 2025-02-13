require('dotenv').config();
const { Sequelize } = require('sequelize');

let sequelize;

if (process.env.USE_DUMMY_DB === 'true') {
  // Modo dummy: simulamos la conexión a la base de datos.
  sequelize = {
    authenticate: async () => {
      console.log('Dummy DB: authenticate OK');
    },
    sync: async () => {
      console.log('Dummy DB: sync OK');
    },
  };
} else {
  // Modo real: utilizar SQLite (o la cadena de conexión definida en DB_CONNECTION_STRING)
  sequelize = new Sequelize(
    process.env.DB_CONNECTION_STRING || 'sqlite:./easyorder.sqlite',
    { logging: false }
  );
}

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

