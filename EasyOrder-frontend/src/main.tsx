/**
 ** NOTA: Componente principal encargado de renderizar la aplicación
 **       EasyOrder en el elemento raíz DOM con React.StrictMode.
 *
 * main.tsx - creado/actualizado por Raúl Bañuelos - 19/12/2024
 */

 import React from 'react';
 import ReactDOM from 'react-dom';
 import EasyOrderApp from './EasyOrder';
 
 ReactDOM.render(
     <React.StrictMode>
         <EasyOrderApp />
     </React.StrictMode>,
     document.getElementById('root')
 );
 