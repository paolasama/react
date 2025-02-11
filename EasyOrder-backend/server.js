// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mesasRoutes = require('./routes/mesasRoutes');  // Ruta de las mesas

// Middleware
app.use(bodyParser.json());  // Para parsear el cuerpo de las solicitudes en formato JSON

// Rutas
app.use('/api', mesasRoutes); // Ruta para las mesas

// Manejo de error 404
app.use((req, res, next) => {
  res.status(404).send({ error: 'Ruta no encontrada' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
