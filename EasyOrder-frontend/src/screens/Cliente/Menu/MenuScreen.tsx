// src/screens/Administrador/MenuScreen.tsx
import { useEffect, useState } from "react";
import { Container, Paper, Typography, Box } from "@mui/material";
import MenuForm from "../../../components/Administrador/Menu/MenuFrom";
import MenuList from "../../../components/Administrador/Menu/MenuList";
import {
  obtenerMenus,
  crearMenu,
  eliminarMenu,
} from "../../../services/Administrador/servicioMenu";
import axios from "axios";

interface Sucursal {
  id: number;
  nombre: string;
}

interface MenuItem {
  id: number;
  nombre: string;
  activo: boolean;
  sucursal?: {
    id: number;
    nombre: string;
  };
}

// Tipo local para la data que se envía para crear un menú
interface MenuCreateData {
  nombre: string;
  activo: boolean;
  restaurante_id: number;
  sucursal_id: number | null;
}

export default function MenuScreen() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Ajusta a tu backend real (puerto 3000 si Postman indica eso)
  const API_BASE_URL = "http://localhost:3000/api";

  // Cargar menús
  const fetchMenus = async () => {
    setLoading(true);
    try {
      const data = await obtenerMenus(); // Llama a servicioMenu
      setMenus(data);
      setError(false);
    } catch (err) {
      console.error("Error al obtener menús:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Cargar sucursales
  const fetchSucursales = async () => {
    try {
      const response = await axios.get<Sucursal[]>(`${API_BASE_URL}/sucursales`);
      setSucursales(response.data);
    } catch (err) {
      console.error("Error al obtener sucursales:", err);
    }
  };

  useEffect(() => {
    fetchMenus();
    fetchSucursales();
  }, []);

  // Crear menú
  const handleCreateMenu = async (menuData: MenuCreateData) => {
    try {
      await crearMenu(menuData);
      fetchMenus(); // recargar la lista
    } catch (err) {
      console.error("Error al crear menú:", err);
    }
  };

  // Eliminar menú
  const handleDeleteMenu = async (id: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar este menú?")) return;
    try {
      await eliminarMenu(id);
      fetchMenus();
    } catch (err) {
      console.error("Error al eliminar menú:", err);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 4, p: 3 }}>
          <Typography>Cargando menús...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 4, p: 3 }}>
          <Typography color="error">Error al cargar menús.</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper sx={{ mt: 4, p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Gestión de Menús
        </Typography>

        <MenuForm onCreate={handleCreateMenu} sucursales={sucursales} />

        <Typography variant="h6" gutterBottom>
          Lista de menús
        </Typography>
        <MenuList menus={menus} onDelete={handleDeleteMenu} />
      </Paper>
    </Container>
  );
}
