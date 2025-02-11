import React from 'react'; // Importamos React para poder usar JSX
import ReactDOM from 'react-dom'; // Importamos ReactDOM para poder renderizar el componente en el DOM
import EasyOrderApp from './EasyOrder'; // Importamos el componente principal de la aplicación

// Usamos ReactDOM.render para renderizar el componente en el elemento con id 'root'
ReactDOM.render(
    <React.StrictMode> {/* Modo estricto para advertencias y mejores prácticas en desarrollo */}
        <EasyOrderApp /> {/* Componente principal de la aplicación */}
    </React.StrictMode>,
    document.getElementById('root') // Aquí es donde se monta la aplicación en el DOM
);
