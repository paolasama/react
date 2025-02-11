import axios from 'axios';

const API_URL = 'http://localhost:3000/api/mesas';  // Asegúrate de que esta URL esté correcta

// Función para obtener todas las mesas
const getMesas = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;  // Devuelve los datos de las mesas
    } catch (error) {
        console.error("Error al obtener mesas:", error);
        throw error;
    }
};

// Función para crear una nueva mesa
const postMesa = async (mesaData: { numeroMesa: string, capacidad: string, estado: string, restauranteId: number, sucursalId: number, activo: boolean }) => {
    try {
        const response = await axios.post(API_URL, mesaData);
        return response.data;  // Devuelve la mesa creada
    } catch (error) {
        console.error("Error al crear mesa:", error);
        throw error;
    }
};

export default {
    getMesas,
    postMesa
};
