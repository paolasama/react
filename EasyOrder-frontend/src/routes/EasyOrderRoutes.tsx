/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RestaurantesScreen from '../components/Administrador/Restaurante/indexFrom';
import SucursalScreen from '../screens/Administador/SucursalScreen';
import MesaScreen from '../screens/Administador/MesaScreen';
import MenusScreen from '../components/Administrador/Menu/indexFrom';
import MenuItemScreen from '../components/Administrador/MenuItems/indexFrom';
import MenuScreen from '../screens/Cliente/Menu/index';
import MiOrdenScreen from '../screens/Cliente/OrdenarPedido/index';
import DetallePlatillo from '../screens/Cliente/Menu/DetallePlatillo';
import LoginForm from '../screens/Login/InicioSesion';
import NotFoundScreen from '../components/Common/NotFound';

const rutas = {
    ADMINISTRADOR: {
        restaurantes: '/admin/restaurantes',
        sucursales: '/admin/sucursales',
        mesas: '/admin/mesas',
        menus: '/admin/menus',
        menuItems: '/admin/menuitems',
    },
    CLIENTE: {
        menu: '/',
        miOrden: '/mi-orden',
        detallePlatillo: '/detalle-platillo/:id',
    },
    LOGIN: '/login',
};

const EasyOrderRoutes: React.FC = () => {
    const alAgregarRestaurante = (nuevoRestaurante: { nombre: string; id: number }) => {
        console.log('Nuevo Restaurante:', nuevoRestaurante);
    };

    return (
        <Router>
            <Routes>
                {/* Rutas de Administrador */}
                <Route
                    path={rutas.ADMINISTRADOR.restaurantes}
                    element={<RestaurantesScreen alAgregarRestaurante={alAgregarRestaurante} />}
                />
                <Route path={rutas.ADMINISTRADOR.sucursales} element={<SucursalScreen />} />
                <Route path={rutas.ADMINISTRADOR.mesas} element={<MesaScreen />} />
                <Route path={rutas.ADMINISTRADOR.menus} element={<MenusScreen />} />
                <Route path={rutas.ADMINISTRADOR.menuItems} element={<MenuItemScreen />} />

                {/* Rutas de Cliente */}
                <Route path={rutas.CLIENTE.menu} element={<MenuScreen />} />
                <Route path={rutas.CLIENTE.miOrden} element={<MiOrdenScreen />} />
                <Route path={rutas.CLIENTE.detallePlatillo} element={<DetallePlatillo />} />

                {/* Ruta de Login */}
                <Route path={rutas.LOGIN} element={<LoginForm />} />

                {/* Redirección predeterminada */}
                <Route path="/" element={<Navigate to={rutas.CLIENTE.menu} />} />

                {/* Ruta para manejar páginas no encontradas */}
                <Route path="*" element={<NotFoundScreen />} />
            </Routes>
        </Router>
    );
};

export default EasyOrderRoutes;
