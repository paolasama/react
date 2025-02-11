import { FunctionComponent } from 'react'; // Importamos FunctionComponent de React para tipar el componente
import EasyOrderRoutes from './routes/EasyOrderRoutes'; // Rutas de la aplicación
import { OrderProvider } from './context/OrderContext'; // Contexto para gestionar el estado global de las órdenes

const EasyOrderApp: FunctionComponent = () => {
    return (
        // Proveedor del contexto OrderProvider, que envuelve las rutas de la aplicación
        <OrderProvider>
            <EasyOrderRoutes /> {/* Rutas gestionadas en el componente EasyOrderRoutes */}
        </OrderProvider>
    );
};

export default EasyOrderApp; // Exportamos el componente para su uso en otros archivos
