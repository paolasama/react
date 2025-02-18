import axios from "axios";

// Definir la URL base del backend
const API_URL = "http://localhost:3000/api/menu-items";

// Interfaz del ítem de menú
export interface MenuItem {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoriaId: number;
  activo: boolean;
  imagen?: File | null;
}

// Obtener todos los ítems de menú
export const obtenerMenuItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los ítems del menú:", error);
    throw error;
  }
};

// Registrar un nuevo ítem de menú con imagen
export const registrarMenuItem = async (nuevoItem: MenuItem) => {
  try {
    const formData = new FormData();
    formData.append("nombre", nuevoItem.nombre);
    formData.append("descripcion", nuevoItem.descripcion);
    formData.append("precio", String(nuevoItem.precio));
    formData.append("categoriaId", String(nuevoItem.categoriaId));
    formData.append("activo", String(nuevoItem.activo));
    if (nuevoItem.imagen) {
      formData.append("imagen", nuevoItem.imagen);
    }

    const response = await axios.post(API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Error al registrar el ítem de menú:", error);
    throw error;
  }
};

// Cambiar estado activo/inactivo de un ítem
export const cambiarEstadoMenuItem = async (id: number) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/toggle`);
    return response.data;
  } catch (error) {
    console.error("Error al cambiar estado del ítem de menú:", error);
    throw error;
  }
};

// Editar un ítem de menú existente
export const editarMenuItem = async (id: number, itemActualizado: MenuItem) => {
  try {
    const formData = new FormData();
    formData.append("nombre", itemActualizado.nombre);
    formData.append("descripcion", itemActualizado.descripcion);
    formData.append("precio", String(itemActualizado.precio));
    formData.append("categoriaId", String(itemActualizado.categoriaId));
    formData.append("activo", String(itemActualizado.activo));
    if (itemActualizado.imagen) {
      formData.append("imagen", itemActualizado.imagen);
    }

    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Error al actualizar el ítem de menú:", error);
    throw error;
  }
};

// Eliminar un ítem de menú
export const eliminarMenuItem = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el ítem de menú:", error);
    throw error;
  }
};
