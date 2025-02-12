import { FunctionComponent } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 📌 Pantallas de Administrador
import RestaurantesScreen from '../screens/RestaurantesScreen';
import SucursalScreen from '../screens/SucursalScreen';
import MesaScreen from '../screens/MesaScreen';

// 📌 Pantallas de Cliente
import MenuScreen from '../screens/Cliente/Menu';
import MiOrdenScreen from '../screens/Cliente/OrdenarPedido';
//import DetallePlatilloScreen from '../screens/Cliente/DetallePlatillo';

// 📌 Pantalla de Login y Error 404
import LoginForm from '../screens/Login/InicioSesion';
import NotFoundScreen from '../components/Common/NotFound';

const EasyOrderRoutes: FunctionComponent = () => {
    return (
        <Router>
            <Routes>
                {/* Redirección a /menu por defecto */}
                <Route path="/" element={<Navigate to="/menu" />} />

                {/* Rutas de Administrador */}
                <Route path="/admin/restaurantes" element={<RestaurantesScreen />} />
                <Route path="/admin/sucursales" element={<SucursalScreen />} />
                <Route path="/admin/mesas" element={<MesaScreen />} />

                {/* Rutas de Cliente */}
                <Route path="/menu" element={<MenuScreen />} />
                <Route path="/mi-orden" element={<MiOrdenScreen />} />
                
                {/* Pantalla de Login */}
                <Route path="/login" element={<LoginForm />} />

                {/* Ruta para páginas no encontradas */}
                <Route path="*" element={<NotFoundScreen />} />
            </Routes>
        </Router>
    );
};

export default EasyOrderRoutes;
