import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from '../components/Administrador/Menu/indexFrom.tsx'; // Actualiza la ruta

const EasyOrderRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} /> {/* Esta es la ruta principal */}
        {/* Puedes agregar más rutas aquí */}
      </Routes>
    </Router>
  );
};

export default EasyOrderRoutes;
