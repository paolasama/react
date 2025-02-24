import { FunctionComponent } from 'react';
import EasyOrderRoutes from './routes/EasyOrderRoutes';
// Importamos la exportación por defecto
import OrderProvider from './context/OrderContext';

const EasyOrderApp: FunctionComponent = () => {
    return (
        <OrderProvider>
            <EasyOrderRoutes />
        </OrderProvider>
    );
};

export default EasyOrderApp;
