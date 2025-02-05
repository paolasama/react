import axios from 'axios';

// Definir la URL base de la API
const API_URL = 'http://localhost:3000/api/restaurantes'; // Ajustar según el entorno

// 📌 **Interfaz para modelar la tabla `public.restaurantes`**
export interface Restaurante {
  id: number;
  nombre: string;
  direccion?: string; // Opcional en caso de no existir
  activo: boolean;
  creado_en?: string; // Fecha opcional, normalmente generada por la BD
  actualizado_en?: string; // Fecha opcional para auditoría
}

// 📌 **Obtener todos los restaurantes activos**
export const obtenerRestaurantes = async (): Promise<Restaurante[]> => {
  try {
    const response = await axios.get<Restaurante[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los restaurantes:', error);
    throw error;
  }
};

// 📌 **Obtener un restaurante por ID**
export const obtenerRestaurantePorId = async (id: number): Promise<Restaurante> => {
  try {
    const response = await axios.get<Restaurante>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el restaurante con ID ${id}:`, error);
    throw error;
  }
};

// 📌 **Crear un nuevo restaurante**
export const crearRestaurante = async (nuevoRestaurante: Omit<Restaurante, 'id' | 'creado_en' | 'actualizado_en'>): Promise<Restaurante> => {
  try {
    const response = await axios.post<Restaurante>(API_URL, nuevoRestaurante);
    return response.data;
  } catch (error) {
    console.error('Error al crear el restaurante:', error);
    throw error;
  }
};

// 📌 **Actualizar un restaurante por ID**
export const actualizarRestaurante = async (id: number, datosActualizados: Partial<Omit<Restaurante, 'id' | 'creado_en' | 'actualizado_en'>>): Promise<Restaurante> => {
  try {
    const response = await axios.put<Restaurante>(`${API_URL}/${id}`, datosActualizados);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el restaurante con ID ${id}:`, error);
    throw error;
  }
};

// 📌 **Eliminar (desactivar) un restaurante por ID**
export const eliminarRestaurante = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar el restaurante con ID ${id}:`, error);
    throw error;
  }
};
