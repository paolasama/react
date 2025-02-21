import axios from "axios";

/** URL base de tu backend */
const API_URL = "http://localhost:3000/api/menu-items";

/** Interfaz para la tabla 'categorias' */
export interface Categoria {
  id: number;
  nombre: string;
}

/** Interfaz principal para un 'menu_item' */
export interface MenuItem {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoriaId: number; // Front-end usa camelCase
  activo: boolean;
  imagen?: File | null;
  categoria?: Categoria; // Objeto categoría devuelto por el back
}

/** Obtener todos los ítems de menú */
export async function obtenerMenuItems(): Promise<MenuItem[]> {
  const response = await axios.get(API_URL);
  return response.data; // Se asume que el backend retorna un array de 'MenuItem'
}

/** Registrar un nuevo ítem de menú (con imagen) */
export async function registrarMenuItem(
  nuevoItem: Omit<MenuItem, "id">
): Promise<MenuItem> {
  const formData = new FormData();
  formData.append("nombre", nuevoItem.nombre);
  formData.append("descripcion", nuevoItem.descripcion);
  formData.append("precio", String(nuevoItem.precio));
  // Nota: en el back se espera "categoriaId", luego se convierte a "categoria_id"
  formData.append("categoriaId", String(nuevoItem.categoriaId));
  formData.append("activo", String(nuevoItem.activo));
  if (nuevoItem.imagen) {
    formData.append("imagen", nuevoItem.imagen);
  }

  const response = await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data; // Retorna el 'MenuItem' creado
}

/** Cambiar estado activo/inactivo de un ítem */
export async function cambiarEstadoMenuItem(id: number): Promise<MenuItem> {
  // Llamamos al endpoint PUT /:id/toggle
  const response = await axios.put(`${API_URL}/${id}/toggle`);
  return response.data;
}

/** Eliminar un ítem de menú */
export async function eliminarMenuItem(id: number): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}
