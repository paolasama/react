import { useEffect, useState } from "react";
import { Container, Paper, Typography, Box, CircularProgress, Snackbar, Alert } from "@mui/material";
import MenuForm from "../../../components/Administrador/Menu/MenuFrom";
import MenuList from "../../../components/Administrador/Menu/MenuList";
import { obtenerMenus, crearMenu, eliminarMenu } from "../../../services/Administrador/servicioMenu";
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const API_BASE_URL = "http://localhost:3000/api";

  // Cargar menús y sucursales en paralelo
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [menusData, sucursalesData] = await Promise.all([
          obtenerMenus(),
          axios.get<Sucursal[]>(`${API_BASE_URL}/sucursales`),
        ]);
        setMenus(menusData);
        setSucursales(sucursalesData.data);
        setError(false);
      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Crear menú
  const handleCreateMenu = async (menuData: MenuCreateData) => {
    try {
      await crearMenu(menuData);
      setSnackbarMessage("Menú registrado exitosamente 🎉");
      setSnackbarOpen(true);
      fetchMenus(); // recargar la lista
    } catch (err) {
      console.error("Error al crear menú:", err);
      setSnackbarMessage("Error al crear menú");
      setSnackbarOpen(true);
    }
  };

  // Eliminar menú con confirmación visual de SweetAlert2
  const handleDeleteMenu = async (id: number) => {
    const confirmDelete = window.confirm("¿Seguro que deseas eliminar este menú? Esta acción no se puede deshacer.");
  
    if (!confirmDelete) return;
  
    try {
      await eliminarMenu(id);
      fetchMenus();
      alert("Menú eliminado exitosamente.");
    } catch (err) {
      console.error("Error al eliminar menú:", err);
      alert("Error al eliminar menú.");
    }
  };
  

  // Recargar menús
  const fetchMenus = async () => {
    setLoading(true);
    try {
      const data = await obtenerMenus();
      setMenus(data);
      setError(false);
    } catch (err) {
      console.error("Error al obtener menús:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ mt: 4, p: 3, bgcolor: "#f9f9f9", borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom color="primary">
          🍽️ Gestión de Menús
        </Typography>

        {/* Carga en progreso */}
        {loading && (
          <Box display="flex" justifyContent="center" my={3}>
            <CircularProgress />
          </Box>
        )}

        {/* Error al cargar */}
        {error && (
          <Box sx={{ textAlign: "center", my: 2 }}>
            <Typography color="error">Error al cargar menús. Intenta nuevamente.</Typography>
          </Box>
        )}

        {!loading && !error && (
          <>
            {/* Formulario para agregar menú */}
            <MenuForm onCreate={handleCreateMenu} sucursales={sucursales} />

            {/* Lista de menús */}
            <Typography variant="h6" gutterBottom>
              📜 Lista de Menús
            </Typography>
            <MenuList menus={menus} onDelete={handleDeleteMenu} />
          </>
        )}
      </Paper>

      {/* Snackbar de notificación */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
