import axios from 'axios';

// 📌 Creación de una instancia base de la API usando axios
const urlBase_API = axios.create({
    baseURL: 'http://localhost:3000/api/sucursales', // URL base para todas las solicitudes
    headers: {
        'Content-Type': 'application/json', // Indicamos que los datos que enviamos/recibimos están en formato JSON
    },
});

// 📌 Interfaces de tipos para las sucursales
export interface SucursalProps {
    id: number;
    nombre: string;
    direccion: string;
    restaurante: { nombre: string }; // Información del restaurante asociado
    createdAt: string; // Fecha de creación
    updatedAt: string; // Fecha de última actualización
}

export interface NuevaSucursalProps {
    nombre: string; // Nombre de la sucursal
    direccion: string; // Dirección de la sucursal
    restauranteId: number; // ID del restaurante asociado
}

// 📌 Servicio para interactuar con la API de sucursales
const servicioSucursal = {
    // 📤 Método para enviar una nueva sucursal al backend
    postSucursal: async (sucursalData: NuevaSucursalProps): Promise<SucursalProps> => {
        console.log("📤 Enviando datos al backend:", sucursalData);
        try {
            // Realizamos una solicitud POST para crear una nueva sucursal
            const response = await urlBase_API.post('/', sucursalData);
            console.log("✅ Respuesta del backend:", response.data);
            return response.data; // Retornamos la respuesta del backend (la sucursal creada)
        } catch (error) {
            // Manejamos los errores de la solicitud
            if (axios.isAxiosError(error)) {
                // Si es un error de axios, mostramos detalles del error
                console.error("❌ Error en postSucursal:", error.response?.data || error.message);
            } else {
                // En caso de errores inesperados (no relacionados con axios)
                console.error("❌ Error inesperado:", error);
            }
            throw error; // Lanzamos el error para que lo maneje quien haya llamado a la función
        }
    },

    // 📝 Método para obtener todas las sucursales
    getSucursales: async (): Promise<SucursalProps[]> => {
        // Realizamos una solicitud GET para obtener todas las sucursales
        const response = await urlBase_API.get('/');
        return response.data; // Retornamos la lista de sucursales
    },

    // 🔄 Método para actualizar la sucursal por su ID
    putSucursalID: async (id: number, sucursalData: NuevaSucursalProps): Promise<SucursalProps> => {
        // Realizamos una solicitud PUT para actualizar la sucursal
        const response = await urlBase_API.put(`/${id}`, sucursalData);
        return response.data; // Retornamos la sucursal actualizada
    },

    // 🗑 Método para eliminar una sucursal por su ID
    deleteSucursal: async (id: number): Promise<void> => {
        // Realizamos una solicitud DELETE para eliminar la sucursal
        await urlBase_API.delete(`/${id}`);
    },
};

// Exportamos el servicio para usarlo en otras partes de la aplicación
export default servicioSucursal;
