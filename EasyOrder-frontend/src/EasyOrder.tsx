/**
 ** NOTA: Componente encargado de gestionar el estado global y las rutas.
 *
 * EasyOrderApp.tsx - creado/actualizado por Raúl Bañuelos - 19/12/2024
 */

 import { FunctionComponent } from 'react';
 import EasyOrderRoutes from './routes/EasyOrderRoutes';
 import { OrderProvider } from './context/OrderContext';
 
 const EasyOrderApp: FunctionComponent = () => {
     return (
         <OrderProvider>
             <EasyOrderRoutes />
         </OrderProvider>
     );
 };
 
 export default EasyOrderApp;
 