import { FunctionComponent } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
 
// Pantallas de Administrador
import RestaurantesScreen from '../screens/Administador/RestaurantesScreen';
import SucursalScreen from '../screens/Administador/SucursalScreen';
import MesaScreen from '../screens/Administador/MesaScreen';

// Pantallas de Cliente
import MenuScreen from '../screens/Cliente/Menu';
import MiOrdenScreen from '../screens/Cliente/OrdenarPedido';
import DetallePlatillo from '../screens/Cliente/Menu/DetallePlatillo';

// Pantalla de Login
import LoginForm from '../screens/Login/InicioSesion';
import NotFoundScreen from '../components/Common/NotFound';


 
 const EasyOrderRoutes: FunctionComponent = () => {
     return (
         <Router>
             <Routes>
                 <Route path="/" element={<Navigate to="/menu" />} />
                 <Route path="/admin/restaurantes" element={<RestaurantesScreen />} />
                 <Route path="/admin/sucursales" element={<SucursalScreen />} />
                 <Route path="/admin/mesas" element={<MesaScreen />} />
                 <Route path="/menu" element={<MenuScreen />} />
                 <Route path="/mi-orden" element={<MiOrdenScreen />} />
                 <Route path="/detalle-platillo/:id" element={<DetallePlatillo />} />
                 <Route path="/login" element={<LoginForm />} />
                 <Route path="*" element={<NotFoundScreen />} />
             </Routes>
         </Router>
     );
 };
 
 export default EasyOrderRoutes;
 