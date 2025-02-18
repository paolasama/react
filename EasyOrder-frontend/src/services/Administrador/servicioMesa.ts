// src/services/Administrador/servicioMesa.ts
import axios from "axios";

interface Mesa {
  id?: number;
  nombre: string;
  activo?: boolean;
  // otros campos si los necesitas
}

const API_URL = "http://localhost:3001/api";

/**
 * Obtener todas las mesas
 */
export const obtenerMesas = async (): Promise<Mesa[]> => {
  const response = await axios.get<Mesa[]>(`${API_URL}/mesas`);
  return response.data;
};

/**
 * Crear una nueva mesa
 */
export const crearMesa = async (mesaData: Partial<Mesa>): Promise<Mesa> => {
  const response = await axios.post<Mesa>(`${API_URL}/mesas`, mesaData);
  return response.data;
};

/**
 * Eliminar una mesa
 */
export const eliminarMesa = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/mesas/${id}`);
};
