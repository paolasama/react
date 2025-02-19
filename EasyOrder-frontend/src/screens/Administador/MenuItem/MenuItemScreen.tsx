import { useEffect, useState } from "react";
import { Container, Box, Typography, CircularProgress, Alert, Paper } from "@mui/material";
import MenuItemForm from "../../../components/Administrador/MenuItems/MenuItemsFrom";
import MenuItemList from "../../../components/Administrador/MenuItems/MenuItemsList";
import { obtenerMenuItems, registrarMenuItem, cambiarEstadoMenuItem } from "../../../services/Administrador/servicioMenuItems";

/** Tipo local para los ítems de menú */
interface MenuItem {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria?: {
    id: number;
    nombre: string;
  };
  activo: boolean;
}

function MenuItemScreen() {
  // ✅ Estado de la lista de ítems
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // Cargar ítems al montar el componente
  useEffect(() => {
    fetchItems();
  }, []);

  // Función para obtener los ítems desde la API
  const fetchItems = async () => {
    setLoading(true);
    try {
      const data: MenuItem[] = await obtenerMenuItems();
      setItems(data);
      setError(false);
    } catch (error) {
      console.error("Error al cargar ítems:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Función para registrar un nuevo ítem
  const handleSubmit = async (formData: FormData) => {
    try {
      // ✅ Convertir FormData a JSON
      const data: Omit<MenuItem, "id"> & { categoriaId: number } = {
        nombre: formData.get("nombre") as string,
        descripcion: formData.get("descripcion") as string,
        precio: Number(formData.get("precio")),
        categoriaId: Number(formData.get("categoriaId")),
        activo: formData.get("activo") === "true",
      };

      await registrarMenuItem(data);
      fetchItems();
    } catch (error) {
      console.error("Error al registrar ítem:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper
        sx={{
          mt: 4,
          p: 4,
          borderRadius: 6,
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          color="primary"
          sx={{ mb: 3, fontFamily: "Poppins, sans-serif" }}
        >
          🍷 Gestión de Ítems del Menú
        </Typography>

        {/* Muestra un spinner mientras carga */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
            <CircularProgress />
            <Typography sx={{ ml: 2 }}>Cargando ítems...</Typography>
          </Box>
        )}

        {/* Muestra un mensaje de error si la API falla */}
        {error && <Alert severity="error">❌ No se pudieron cargar los ítems.</Alert>}

        {/* Formulario para agregar ítems */}
        {!loading && !error && <MenuItemForm onSubmit={handleSubmit} />}

        {/* Lista de ítems */}
        {!loading && !error && (
          <>
            <Typography variant="h5" textAlign="center" sx={{ my: 3, fontWeight: "bold" }}>
            </Typography>
            <MenuItemList items={items} loading={loading} error={error} onToggle={cambiarEstadoMenuItem} />
          </>
        )}
      </Paper>
    </Container>
  );
}

export default MenuItemScreen;
