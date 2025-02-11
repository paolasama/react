import axios from 'axios';

// Base de la API
const urlBase_API = axios.create({
    baseURL: 'http://localhost:3000/api/restaurantes',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interfaces de los restaurantes
export interface RestauranteProps {
    id: number;
    nombre: string;
    direccion: string;
    activo: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface NuevoRestauranteProps {
    nombre: string;
    direccion: string;
    activo?: boolean;
}

// Servicio para interactuar con la API
const servicioRestaurante = {
    postRestaurante: async (restaurantData: NuevoRestauranteProps): Promise<RestauranteProps> => {
        console.log("📤 Enviando datos al backend:", restaurantData);
        try {
            const response = await urlBase_API.post('/', restaurantData);
            console.log("✅ Respuesta del backend:", response.data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("❌ Error en postRestaurante:", error.response?.data || error.message);
            } else {
                console.error("❌ Error inesperado:", error);
            }
            throw error;
        }
    },
    getRestaurantes: async (): Promise<RestauranteProps[]> => {
        const response = await urlBase_API.get('/');
        return response.data;
    },
    putRestauranteIDEstado: async (id: number, isActive: boolean): Promise<RestauranteProps> => {
        const response = await urlBase_API.put(`/${id}`, { activo: isActive });
        return response.data;
    },
};

export default servicioRestaurante;
