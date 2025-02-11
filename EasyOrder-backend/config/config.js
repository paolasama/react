require('dotenv').config(); // Cargar variables de entorno desde .env

// Verificación de variables de entorno
const requiredEnvVars = ['DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_HOST', 'QR_KEY', 'JWT_SECRET'];

requiredEnvVars.forEach(key => {
  if (!process.env[key]) {
    console.warn(`⚠️  Falta la variable de entorno: ${key}`);
  }
});

// Configuración de la base de datos y claves
const config = {
  development: {
    username: process.env.DB_USER || 'default_user',
    password: process.env.DB_PASSWORD || 'default_password',
    database: process.env.DB_NAME || 'default_db',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    qrKey: process.env.QR_KEY || 'default_qr_key',
    jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret',
  },
  test: {
    username: process.env.DB_USER || 'default_user',
    password: process.env.DB_PASSWORD || 'default_password',
    database: process.env.DB_NAME || 'default_db',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    qrKey: process.env.QR_KEY || 'default_qr_key',
    jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
    qrKey: process.env.QR_KEY,
    jwtSecret: process.env.JWT_SECRET,
  },
};

// Mostrar valores de entorno cargados (solo para depuración)
console.log("\n🔹 Configuración Cargada:");
console.log("🔹 DB_USER:", process.env.DB_USER || "No definida");
console.log("🔹 QR_KEY:", process.env.QR_KEY || "No definida");
console.log("🔹 JWT_SECRET:", process.env.JWT_SECRET || "No definida");

module.exports = config;
