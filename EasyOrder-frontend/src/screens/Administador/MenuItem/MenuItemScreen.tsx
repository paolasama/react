// src/screens/Administrador/MenuItemScreen.tsx

import { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import MenuItemForm, { MenuItemFormData } from "../../../components/Administrador/MenuItems/MenuItemsFrom";
import MenuItemList from "../../../components/Administrador/MenuItems/MenuItemsList";
import {
  obtenerMenuItems,
  registrarMenuItem,
  cambiarEstadoMenuItem,
} from "../../../services/Administrador/servicioMenuItems";

/** Tipo local para la lista (con 'categoria' como objeto si tu backend lo retorna) */
interface MenuItem {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria?: {
    id: number;
    nombre: string;
  };
  activo: boolean;
}

function MenuItemScreen() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Cargar items
  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await obtenerMenuItems();
      setItems(data);
      setError(false);
    } catch (error) {
      console.error("Error al cargar ítems:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Manejar registro de un nuevo item
  const handleSubmit = async (formData: MenuItemFormData) => {
    try {
      // Quitamos "id" para que coincida con Omit<MenuItem, 'id'>
      await registrarMenuItem({
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: formData.precio,
        categoriaId: formData.categoriaId,
        activo: formData.activo,
        imagen: formData.imagen || null,
      });
      // Recargar la lista
      fetchItems();
    } catch (error) {
      console.error("Error al registrar el ítem:", error);
    }
  };

  // Manejar toggle de activo/inactivo
  const handleToggle = async (id: number) => {
    try {
      await cambiarEstadoMenuItem(id);
      fetchItems();
    } catch (error) {
      console.error("Error al cambiar estado del ítem:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, p: 3 }}>
        <MenuItemForm onSubmit={handleSubmit} />
        <MenuItemList
          items={items}
          loading={loading}
          error={error}
          onToggle={handleToggle}
        />
      </Box>
    </Container>
  );
}

export default MenuItemScreen;
