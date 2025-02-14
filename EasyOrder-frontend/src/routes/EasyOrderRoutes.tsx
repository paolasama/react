import { FunctionComponent } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 📌 Pantallas de Administrador
import RestaurantesScreen from '../screens/Administador/Restaurante/RestaurantesScreen';
import SucursalScreen from '../screens/Administador/Sucursal/SucursalScreen';
import MesaScreen from '../screens/Administador/Mesa/MesaScreen';

// 📌 Pantallas de Cliente
import MenuScreen from '../screens/Cliente/Menu/MenuScreen';
import MiOrdenScreen from '../screens/Cliente/OrdenarPedido';
import DetallePlatillo from '../screens/Cliente/Menu/DetallePlatillo';

// 📌 Pantalla de Login
import LoginForm from '../screens/Login/InicioSesion';
import NotFoundScreen from '../components/Common/NotFound';

// 🚀 Definición del componente EasyOrderRoutes para manejar las rutas de la aplicación
const EasyOrderRoutes: FunctionComponent = () => {
    return (
        <Router>
            <Routes>
                {/* Redirige el inicio al menú principal */}
                <Route path="/" element={<Navigate to="/menu" />} />
                
                {/* Rutas de administrador */}
                <Route path="/admin/restaurantes" element={<RestaurantesScreen />} />
                <Route path="/admin/sucursales" element={<SucursalScreen />} />
                <Route path="/admin/mesas" element={<MesaScreen />} />

                {/* Rutas de cliente */}
                <Route path="/menu" element={<MenuScreen />} />                
                <Route path="/mi-orden" element={<MiOrdenScreen />} />
                <Route path="/detalle-platillo/:id" element={<DetallePlatillo />} />

                {/* Ruta para iniciar sesión */}
                <Route path="/login" element={<LoginForm />} />

                {/* Ruta de error para cualquier ruta no encontrada */}
                <Route path="*" element={<NotFoundScreen />} />
            </Routes>
        </Router>
    );
};

export default EasyOrderRoutes;
