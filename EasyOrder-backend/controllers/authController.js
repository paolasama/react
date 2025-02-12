const jwt = require('jsonwebtoken');

// Generar un token con la clave secreta desde las variables de entorno
const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

console.log(token);
