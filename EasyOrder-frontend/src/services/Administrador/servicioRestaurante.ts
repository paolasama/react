import axios from 'axios';

// 📌 Configuración de la API
const API_URL = 'http://localhost:3000/api/restaurantes';

export interface Restaurante {
    id: number;
    nombre: string;
    direccion?: string;
    activo: boolean;
    creado_en?: string;
    actualizado_en?: string;
}

// 📌 **Crear un nuevo restaurante**
export const crearRestaurante = async (nuevoRestaurante: Omit<Restaurante, 'id' | 'creado_en' | 'actualizado_en'>): Promise<Restaurante> => {
    try {
        const response = await axios.post<Restaurante>(API_URL, nuevoRestaurante);
        return response.data;
    } catch (error) {
        console.error('🚨 Error al crear el restaurante:', error);
        throw error;
    }
};

// 📌 **Obtener todos los restaurantes**
export const obtenerRestaurantes = async (): Promise<Restaurante[]> => {
    try {
        const response = await axios.get<Restaurante[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error('🚨 Error al obtener los restaurantes:', error);
        throw error;
    }
};

// 📌 **Actualizar un restaurante**
export const actualizarRestaurante = async (id: number, datosActualizados: Partial<Omit<Restaurante, 'id' | 'creado_en' | 'actualizado_en'>>): Promise<Restaurante> => {
    try {
        const response = await axios.put<Restaurante>(`${API_URL}/${id}`, datosActualizados);
        return response.data;
    } catch (error) {
        console.error(`🚨 Error al actualizar el restaurante con ID ${id}:`, error);
        throw error;
    }
};

// 📌 **Eliminar un restaurante**
export const eliminarRestaurante = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`🚨 Error al eliminar el restaurante con ID ${id}:`, error);
        throw error;
    }
};

// 📌 Exportación
const servicioRestaurante = {
    crearRestaurante,
    obtenerRestaurantes,
    actualizarRestaurante,
    eliminarRestaurante,
};

export default servicioRestaurante;
