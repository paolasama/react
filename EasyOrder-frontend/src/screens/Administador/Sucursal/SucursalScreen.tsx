import { useEffect, useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import SucursalForm from "../../../components/Administrador/Sucursal/SucursalFrom";
import SucursalList from "../../../components/Administrador/Sucursal/SucursalList";
import axios from "axios";

interface Restaurante {
  id: number;
  nombre: string;
}

interface Sucursal {
  id: number;
  nombre: string;
  direccion: string;
  activo: boolean;
  restaurante_id: number;
  restaurante?: {
    id: number;
    nombre: string;
  };
}

export default function SucursalScreen() {
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Ajusta esta URL a tu entorno
  const API_BASE_URL = "http://localhost:3000/api";

  /**
   * Cargar sucursales desde el backend
   */
  const fetchSucursales = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/sucursales`);
      setSucursales(response.data);
      setError(false);
    } catch (err) {
      console.error("Error al obtener sucursales:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cargar restaurantes para el select
   */
  const fetchRestaurantes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/restaurantes`);
      setRestaurantes(response.data);
    } catch (err) {
      console.error("Error al obtener restaurantes:", err);
    }
  };

  useEffect(() => {
    fetchSucursales();
    fetchRestaurantes();
  }, []);

  /**
   * Manejar creación de sucursal
   */
  const handleCreateSucursal = async (nueva: {
    nombre: string;
    direccion: string;
    restaurante_id: number;
  }) => {
    try {
      await axios.post(`${API_BASE_URL}/sucursales`, nueva);
      fetchSucursales(); // refrescar la lista
    } catch (err) {
      console.error("Error al crear sucursal:", err);
    }
  };

  /**
   * Manejar toggle de activo/inactivo
   */
  const handleToggle = async (id: number) => {
    try {
      // asumiendo que tu backend define PUT /sucursales/:id/toggle
      await axios.put(`${API_BASE_URL}/sucursales/${id}/toggle`);
      fetchSucursales();
    } catch (err) {
      console.error("Error al cambiar estado de sucursal:", err);
    }
  };

  /**
   * Manejar eliminación de sucursal
   */
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/sucursales/${id}`);
      fetchSucursales();
    } catch (err) {
      console.error("Error al eliminar sucursal:", err);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4, p: 3 }}>
          <Typography>Cargando sucursales...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4, p: 3 }}>
          <Typography color="error">Error al cargar sucursales.</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, p: 3 }}>
        <SucursalForm onCreate={handleCreateSucursal} restaurantes={restaurantes} />
        <SucursalList sucursales={sucursales} onToggle={handleToggle} onDelete={handleDelete} />
      </Box>
    </Container>
  );
}
