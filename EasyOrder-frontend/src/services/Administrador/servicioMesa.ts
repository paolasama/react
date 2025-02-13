import axios from 'axios';

const API_URL = 'http://localhost:3000/api/mesas';

const getMesas = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener mesas:", error);
    throw error;
  }
};

const postMesa = async (mesaData: { 
  numeroMesa: string, 
  capacidad: string, 
  estado: string, 
  restauranteId: number, 
  sucursalId: number, 
  activo?: boolean,
  codigoQr?: string 
}) => {
  try {
    const response = await axios.post(API_URL, mesaData);
    return response.data;
  } catch (error) {
    console.error("Error al crear mesa:", error);
    throw error;
  }
};

export default {
  getMesas,
  postMesa
};