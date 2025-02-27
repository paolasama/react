import { FunctionComponent } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 📌 Pantallas de Administrador
import RestaurantesScreen from '../screens/Administador/Restaurante/RestaurantesScreen';
import SucursalScreen from '../screens/Administador/Sucursal/SucursalScreen';
import MesaScreen from '../screens/Administador/Mesa/MesaScreen';
import MenuScreen from '../screens/Administador/Menu/MenuScreen';
import MenuItemsScreen from '../screens/Administador/MenuItem/MenuItemScreen';

// 📌 Pantallas de Cliente
import MiOrdenScreen from '../screens/Cliente/OrdenarPedido';
import MenuClienteScreen from '../screens/Cliente/Menu';
import AyudaScreen from '../components/Cliente/InformacionPlatillo/AyudaScreen';
import PagarScreen from '../components/Cliente/Platillos/PagoScreen';


// 📌 Pantalla de Login
import LoginForm from '../screens/Login/InicioSesion';
import NotFoundScreen from '../components/Common/NotFound';
import BuscarScreen from '../components/Cliente/Busqueda/buscarScreen';
import MeseroExitoScreen from '../components/Cliente/InformacionPlatillo/MeseroExitoScreen';
import DetalleItemScreen from '../components/Cliente/InformacionPlatillo/DetalleItemScreen';
import ExitoScreen from '../components/Cliente/InformacionPlatillo/ExitoScreen';
import CarritoScreen from '../components/Cliente/Platillos/CarritoScreen';
import ConfirmacionScreen from '../components/Cliente/Platillos/ConfirmacionScreen';
import PagoexitosoScreen from '../components/Cliente/Platillos/PagoexitosoScreen';
import QrScreen from '../components/Cliente/InformacionPlatillo/QrScreen';

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
                <Route path="/admin/menu-items" element={<MenuItemsScreen />} />
                <Route path="/admin/menu" element={<MenuScreen />} />
                {/* Rutas de cliente */}
                <Route path="/qr" element={<QrScreen />} />
                
                <Route path="/carrito" element={<CarritoScreen />} />
                <Route path="/mi-orden" element={<MiOrdenScreen />} />
                <Route path="/detalle/:id" element={<DetalleItemScreen />} />
                <Route path="/exito" element={<ExitoScreen />} />
                <Route path="/confirmacion" element={<ConfirmacionScreen />} />
                <Route path="/menu" element={<MenuClienteScreen />} />

                <Route path="/buscar" element={<BuscarScreen />} />
                <Route path="/ayuda" element={<AyudaScreen />} />
                <Route path="/meseroexito" element={<MeseroExitoScreen />} />
                <Route path="/pagar" element={<PagarScreen />} />
                <Route path="/pago-exitoso" element={<PagoexitosoScreen />} />
                
                {/* Ruta para iniciar sesión */}
                <Route path="/login" element={<LoginForm />} />
                {/* Ruta de error para cualquier ruta no encontrada */}
                <Route path="*" element={<NotFoundScreen />} />
            </Routes>
        </Router>
    );
};

export default EasyOrderRoutes;
