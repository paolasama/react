// src/screens/Administrador/Mesa/MesaScreen.tsx
import { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import MesaForm from "../../../components/Administrador/Mesa/MesaForm";
import MesaList from "../../../components/Administrador/Mesa/MesaList";
import axios from "axios";

interface Mesa {
  id: number;
  numero_mesa: number;
  capacidad: number;
  estado: string;
  activo: boolean;
  restaurante_id: number; 
  sucursal_id: number;
  restaurante?: { id: number; nombre: string };
  sucursal?: { id: number; nombre: string };
}

export default function MesaScreen() {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Ajusta a tu entorno
  const API_BASE_URL = "http://localhost:3000/api";

  const fetchMesas = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/mesas`);
      setMesas(response.data);
      setError(false);
    } catch (err) {
      console.error("Error al obtener mesas:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMesas();
  }, []);

  // Datos que el formulario envía para crear una nueva mesa
  interface NuevaMesa {
    numeroMesa: number;
    capacidad: number;
    estado: string;
    activo: boolean;
    restauranteId: number;
    sucursalId: number;
  }

  const handleSubmit = async (nuevaMesa: NuevaMesa) => {
    try {
      await axios.post(`${API_BASE_URL}/mesas`, nuevaMesa);
      fetchMesas();
    } catch (error) {
      console.error("Error al registrar la mesa:", error);
    }
  };

  const handleToggle = async (id: number) => {
    try {
      await axios.put(`${API_BASE_URL}/mesas/${id}/toggle`);
      fetchMesas();
    } catch (error) {
      console.error("Error al cambiar estado de la mesa:", error);
    }
  };

  const handleEdit = (id: number) => {
    console.log("Editar mesa con ID:", id);
    // Podrías abrir un modal o redirigir a otra pantalla
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4, p: 3 }}>Cargando mesas...</Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4, p: 3, color: "red" }}>
          Ocurrió un error al cargar las mesas.
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, p: 3 }}>
        <MesaForm onSubmit={handleSubmit} />
        <MesaList mesas={mesas} onToggle={handleToggle} onEdit={handleEdit} />
      </Box>
    </Container>
  );
}
