// src/services/Administrador/servicioMenu.ts
import axios from "axios";

// Ajusta el puerto a 3000 (según tu screenshot de Postman)
const API_URL = "http://localhost:3000/api";

/** Tipo local para un menú (ajusta los campos según tu BD) */
interface MenuItem {
  id: number;
  nombre: string;
  activo: boolean;
  restaurante_id: number;
  sucursal_id?: number | null;
  sucursal?: {
    id: number;
    nombre: string;
  };
}

// Obtener menús (GET /api/menus)
export async function obtenerMenus(): Promise<MenuItem[]> {
  const response = await axios.get<MenuItem[]>(`${API_URL}/menus`);
  return response.data;
}

// Crear menú (POST /api/menus)
export async function crearMenu(menuData: Partial<MenuItem>): Promise<MenuItem> {
  const response = await axios.post<MenuItem>(`${API_URL}/menus`, menuData);
  return response.data;
}

// Eliminar menú (DELETE /api/menus/:id)
export async function eliminarMenu(id: number): Promise<void> {
  await axios.delete(`${API_URL}/menus/${id}`);
}

// (Opcional) Actualizar menú si lo requieres
