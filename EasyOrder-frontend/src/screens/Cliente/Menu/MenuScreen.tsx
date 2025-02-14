import { useEffect, useState } from "react";
import IndexFrom from "../../../components/Administrador/Menu/indexFrom";
import IndexList from "../../../components/Administrador/Menu/indexList";
import { Container, Typography, Paper } from "@mui/material";
import { getMenus, addMenu, deleteMenu } from "../../../services/Administrador/servicioMenu";

interface Menu {
  id: number;
  name: string;
  branch: string;
  active: boolean;
}

export default function MenuScreen() {
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    setMenus(getMenus());
  }, []);

  const handleAddMenu = (newMenu: Menu) => {
    addMenu(newMenu);
    setMenus(getMenus());
  };

  const handleDeleteMenu = (id: number) => {
    deleteMenu(id);
    setMenus(getMenus());
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Gestión de Menús
        </Typography>
        <IndexFrom onAddMenu={handleAddMenu} />
        <IndexList menus={menus} onDeleteMenu={handleDeleteMenu} />
      </Paper>
    </Container>
  );
}
