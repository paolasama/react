/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import MenuItemForm from "../../../components/Administrador/MenuItems/MenuItemsFrom";
import MenuItemList from "../../../components/Administrador/MenuItems/MenuItemsList";
import { obtenerMenuItems, registrarMenuItem, cambiarEstadoMenuItem, MenuItem } from "../../../services/Administrador/servicioMenuItems";

function MenuItemScreen() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await obtenerMenuItems();
      setItems(data);
      setError(false);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (formData: MenuItem) => {
    try {
      await registrarMenuItem(formData);
      fetchItems();
    } catch (error) {
      console.error("Error al registrar el ítem:", error);
    }
  };

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
        <MenuItemForm onSubmit={(nuevoItem: FormData) => void handleSubmit(nuevoItem as unknown as MenuItem)} />
        <MenuItemList items={items} loading={loading} error={error} onToggle={handleToggle} />
      </Box>
    </Container>
  );
}

export default MenuItemScreen;
