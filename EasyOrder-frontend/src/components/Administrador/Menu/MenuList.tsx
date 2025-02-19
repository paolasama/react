import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Typography,
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

export default function MenuList({ menus, onDelete }: MenuListProps) {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 4,
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
        background: "#fff",
        overflowX: "auto",
      }}
    >
      <Typography variant="h6" fontWeight="bold" textAlign="center" color="primary" sx={{ mb: 2 }}>
        📜 Lista de Menús
      </Typography>

      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Sucursal</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Activo</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menus.map((menu) => (
              <TableRow key={menu.id} sx={{ "&:hover": { bgcolor: "#fafafa" } }}>
                <TableCell>{menu.nombre}</TableCell>
                <TableCell>{menu.sucursal ? menu.sucursal.nombre : "Sin sucursal"}</TableCell>
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
    </Paper>
  );
}
