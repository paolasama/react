import { IconButton, Paper, Table, TableHead, TableBody, TableRow, TableCell, Switch } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Menu {
  id: number;
  name: string;
  branch: string;
  active: boolean;
}

interface IndexListProps {
  menus: Menu[];
  onDeleteMenu: (id: number) => void;
}

export default function IndexList({ menus, onDeleteMenu }: IndexListProps) {
  return (
    <Paper sx={{ mt: 3, p: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Nombre</b></TableCell>
            <TableCell><b>Sucursal</b></TableCell>
            <TableCell><b>Activo</b></TableCell>
            <TableCell><b>Acciones</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {menus.map((menu) => (
            <TableRow key={menu.id}>
              <TableCell>{menu.name}</TableCell>
              <TableCell>{menu.branch}</TableCell>
              <TableCell>
                <Switch checked={menu.active} disabled />
              </TableCell>
              <TableCell>
                <IconButton edge="end" aria-label="delete" onClick={() => onDeleteMenu(menu.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
