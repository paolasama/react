/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 ** NOTA: Servicio que se encarga de gestionar las peticiones al servidor
 **       para el módulo de administrador en la sección de restaurantes.
 *
 * servicioRestaurante servicio - creado por Raúl Bañuelos - 22/11/2024
 * Actualización y mejoras - 01/02/2025
 * servicioRestaurante.tsx
 */

// Importaciones de Axios
import axios from 'axios';

/**
 ** Configuración de Axios
 * @author José Raúl Bañuelos Gámez
 */
const urlBase_API = axios.create({
    baseURL: 'http://localhost:3000/api/restaurantes',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 📌 **Interfaces de datos**
export interface RestauranteProps {
    id: number;
    nombre: string;
    direccion: string | null;
    activo: boolean;
    creado_en: string; // Fecha en formato ISO
    actualizado_en: string; // Fecha en formato ISO
}

export interface NuevoRestauranteProps {
    nombre: string;
    direccion?: string; // Opcional ya que puede ser NULL
    activo?: boolean; // Opcional, por defecto true en el backend
}

export interface ActualizaRestauranteProps {
    nombre?: string; // Opcional ya que puede ser NULL
    direccion?: string; // Opcional ya que puede ser NULL
    activo?: boolean; // Opcional ya que puede ser NULL
}

/**
 ** Servicio de gestión de restaurantes
 */
const servicioRestaurante = {
    
    /**
     ** Crear un nuevo restaurante
     * @author José Raúl Bañuelos Gámez
     * @param restaurantData -- Datos del restaurante
     * @returns -- Restaurante creado
     */
    postRestaurante: async (restaurantData: NuevoRestauranteProps): Promise<RestauranteProps> => {
        try {
            const solicitud = await urlBase_API.post('/', restaurantData);
            return solicitud.data;
        } catch (err: any) {
            console.error('Error al crear el restaurante:', err);
            throw err.response?.data?.message || 'Error al crear el restaurante.';
        }
    },

    /**
     ** Obtener todos los restaurantes activos
     * @author José Raúl Bañuelos Gámez
     * @returns -- Listado de restaurantes
     */
    getRestaurantes: async (): Promise<RestauranteProps[]> => {
        try {
            const solicitud = await urlBase_API.get('/');
            return solicitud.data;
        } catch (err: any) {
            console.error('Error al obtener los restaurantes:', err);
            throw err.response?.data?.message || 'Error al obtener los restaurantes.';
        }
    },

    /**
     ** Obtener un restaurante por ID
     * @author José Raúl Bañuelos Gámez
     * @param id -- ID del restaurante
     * @returns -- Datos del restaurante
     */
    getRestauranteID: async (id: number): Promise<RestauranteProps> => {
        try {
            const solicitud = await urlBase_API.get(`/${id}`);
            return solicitud.data;
        } catch (err: any) {
            console.error(`Error al obtener el restaurante con ID ${id}:`, err);
            throw err.response?.data?.message || `Error al obtener el restaurante con ID ${id}.`;
        }
    },

    /**
     ** Actualizar un restaurante por ID
     * @author José Raúl Bañuelos Gámez
     * @param id -- ID del restaurante
     * @param updatedData -- Datos actualizados del restaurante
     * @returns -- Restaurante actualizado
     */
    putRestauranteID: async (id: number, updatedData: ActualizaRestauranteProps): Promise<RestauranteProps> => {
        try {
            const solicitud = await urlBase_API.put(`/${id}`, updatedData);
            return solicitud.data;
        } catch (err: any) {
            console.error(`Error al actualizar el restaurante con ID ${id}:`, err);
            throw err.response?.data?.message || `Error al actualizar el restaurante con ID ${id}.`;
        }
    },

    /**
     ** Actualizar el estado de un restaurante por ID
     * @author José Raúl Bañuelos Gámez
     * @param id -- ID del restaurante
     * @param isActive -- Nuevo estado (activo/desactivado)
     * @returns -- Restaurante con estado actualizado
     */
    putRestauranteIDEstado: async (id: number, isActive: boolean): Promise<RestauranteProps> => {
        try {
            const solicitud = await urlBase_API.put(`/${id}`, { activo: isActive });
            return solicitud.data;
        } catch (err: any) {
            console.error(`Error al actualizar el estado del restaurante con ID ${id}:`, err);
            throw err.response?.data?.message || `Error al actualizar el estado del restaurante con ID ${id}.`;
        }
    },

    /**
     ** Eliminar un restaurante por ID (desactivación lógica)
     * @author José Raúl Bañuelos Gámez
     * @param id -- ID del restaurante a eliminar
     * @returns -- Confirmación de eliminación
     */
    deleteRestaurante: async (id: number): Promise<void> => {
        try {
            await urlBase_API.delete(`/${id}`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error(`Error al eliminar el restaurante con ID ${id}:`, err);
            throw err.response?.data?.message || `Error al eliminar el restaurante con ID ${id}.`;
        }
    },
};

export default servicioRestaurante;
