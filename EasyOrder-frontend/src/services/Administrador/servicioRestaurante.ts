import axios from 'axios';

// 📌 Creación de una instancia base de la API usando axios
const urlBase_API = axios.create({
    baseURL: 'http://localhost:3000/api/restaurantes', // URL base para todas las solicitudes
    headers: {
        'Content-Type': 'application/json', // Indicamos que los datos que enviamos/recibimos están en formato JSON
    },
});

// 📌 Interfaces de tipos para los restaurantes
export interface RestauranteProps {
    id: number;
    nombre: string;
    direccion: string;
    activo: boolean; // Estado activo/inactivo del restaurante
    createdAt: string; // Fecha de creación
    updatedAt: string; // Fecha de última actualización
}

export interface NuevoRestauranteProps {
    nombre: string; // Nombre del restaurante
    direccion: string; // Dirección del restaurante
    activo?: boolean; // Estado activo, opcional para la creación
}

// 📌 Servicio para interactuar con la API de restaurantes
const servicioRestaurante = {
    // 📤 Método para enviar un nuevo restaurante al backend
    postRestaurante: async (restaurantData: NuevoRestauranteProps): Promise<RestauranteProps> => {
        console.log("📤 Enviando datos al backend:", restaurantData);
        try {
            // Realizamos una solicitud POST para crear un nuevo restaurante
            const response = await urlBase_API.post('/', restaurantData);
            console.log("✅ Respuesta del backend:", response.data);
            return response.data; // Retornamos la respuesta del backend (el restaurante creado)
        } catch (error) {
            // Manejamos los errores de la solicitud
            if (axios.isAxiosError(error)) {
                // Si es un error de axios, mostramos detalles del error
                console.error("❌ Error en postRestaurante:", error.response?.data || error.message);
            } else {
                // En caso de errores inesperados (no relacionados con axios)
                console.error("❌ Error inesperado:", error);
            }
            throw error; // Lanzamos el error para que lo maneje quien haya llamado a la función
        }
    },

    // 📝 Método para obtener todos los restaurantes
    getRestaurantes: async (): Promise<RestauranteProps[]> => {
        // Realizamos una solicitud GET para obtener todos los restaurantes
        const response = await urlBase_API.get('/');
        return response.data; // Retornamos la lista de restaurantes
    },

    // 🔄 Método para actualizar el estado (activo/inactivo) de un restaurante por su ID
    putRestauranteIDEstado: async (id: number, isActive: boolean): Promise<RestauranteProps> => {
        // Realizamos una solicitud PUT para actualizar el estado de un restaurante
        const response = await urlBase_API.put(`/${id}`, { activo: isActive });
        return response.data; // Retornamos el restaurante con el nuevo estado
    },
};

// Exportamos el servicio para usarlo en otras partes de la aplicación
export default servicioRestaurante;
