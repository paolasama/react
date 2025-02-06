import React from 'react';
import ReactDOM from 'react-dom/client';
import EasyOrderRoutes from './routes/EasyOrderRoutes'; // Asegúrate de que la ruta sea correcta

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <EasyOrderRoutes /> {/* Aquí se renderizan las rutas */}
    </React.StrictMode>
);
