// src/main.tsx o src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import EasyOrderRoutes from './routes/EasyOrderRoutes'; // Asegúrate de importar las rutas

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <EasyOrderRoutes />
  </React.StrictMode>
);