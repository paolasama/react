import { useState, useEffect } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import MenuItemForm from "../../../components/Administrador/MenuItems/MenuItemsFrom";
import MenuItemList from "../../../components/Administrador/MenuItems/MenuItemsList";

// Definición de la interfaz
interface MenuItem {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  activo: boolean;
  categoria?: {
    id: number;
    nombre: string;
  };
}

// Estilos con styled-components
const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
  border-radius: 10px;
  background: #f9f9f9;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

export default function MenuItemScreen() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/menu-items");
      setItems(res.data);
      setError(false);
    } catch (err) {
      console.error("Error al obtener ítems:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      await axios.post("http://localhost:3000/api/menu-items", formData);
      fetchItems();
    } catch (err) {
      console.error("Error al crear ítem:", err);
    }
  };

  const handleToggle = async (id: number) => {
    try {
      await axios.put(`http://localhost:3000/api/menu-items/${id}/toggle`);
      fetchItems();
    } catch (err) {
      console.error("Error al togglear ítem:", err);
    }
  };

  return (
    <Container>
      <Title>Gestión de Menú</Title>
      <MenuItemForm onSubmit={handleSubmit} />
      <MenuItemList items={items} loading={loading} error={error} onToggle={handleToggle} />
    </Container>
  );
}
