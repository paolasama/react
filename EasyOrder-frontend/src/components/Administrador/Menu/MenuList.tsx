// src/components/Administrador/Menu/MenuList.tsx
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface MenuItem {
  id: number;
  nombre: string;
  activo: boolean;
  sucursal?: {
    id: number;
    nombre: string;
  };
}

interface MenuListProps {
  menus: MenuItem[];
  onDelete: (id: number) => void;
}

function MenuList({ menus, onDelete }: MenuListProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Sucursal</TableCell>
            <TableCell>Activo</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {menus.map((menu) => (
            <TableRow key={menu.id}>
              <TableCell>{menu.nombre}</TableCell>
              <TableCell>
                {menu.sucursal ? menu.sucursal.nombre : "Sin sucursal"}
              </TableCell>
              <TableCell>{menu.activo ? "Sí" : "No"}</TableCell>
              <TableCell>
                <IconButton color="error" onClick={() => onDelete(menu.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {menus.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No hay menús registrados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MenuList;
