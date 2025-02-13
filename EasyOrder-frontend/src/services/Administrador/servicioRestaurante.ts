import axios from 'axios';

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
  activo: boolean;
}

const urlBase_API = axios.create({
  baseURL: 'http://localhost:3000/api/restaurantes',
  headers: {
    'Content-Type': 'application/json',
  },
});

const servicioRestaurante = {
  postRestaurante: async (
    nuevoRestaurante: NuevoRestauranteProps
  ): Promise<RestauranteProps> => {
    try {
      const response = await urlBase_API.post<RestauranteProps>('/', nuevoRestaurante);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Error en postRestaurante:', error.response?.data ?? error.message);
      } else {
        console.error('Error en postRestaurante:', error);
      }
      throw error;
    }
  },

  getRestaurantes: async (): Promise<RestauranteProps[]> => {
    try {
      const response = await urlBase_API.get<RestauranteProps[]>('/');
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Error en getRestaurantes:', error.response?.data ?? error.message);
      } else {
        console.error('Error en getRestaurantes:', error);
      }
      throw error;
    }
  },
};

export default servicioRestaurante;