/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/**
 ** NOTA: Componente que define las rutas de la aplicación EasyOrder
 **       para el módulo de administrador y el módulo de cliente.
 *
 * EasyOrderRoutes componente enrutador - creado/actualizado por Raúl Bañuelos - 19/12/2024
 * EasyOrderRoutes.tsx
 */

// Importaciones React para los módulos de enrutamiento
import { FunctionComponent } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pantallas de Administrador
import RestaurantesScreen from '../screens/Administador/Restaurante';

// Definición de rutas
const rutas = {
    ADMINISTRADOR: {
        restaurantes: '/admin/restaurantes',
    },
};

interface Props {}

const EasyOrderRoutes: FunctionComponent<Props> = () => {
    return (
        <Router>
            <Routes>

                {/* Rutas de Administrador */}
                <Route path={rutas.ADMINISTRADOR.restaurantes} element={<RestaurantesScreen />} />
            </Routes>
        </Router>
    );
};

export default EasyOrderRoutes;
