import { Paper, Table, TableHead, TableBody, TableRow, TableCell, Switch, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import RoomIcon from "@mui/icons-material/Room";

interface Sucursal {
  id: number;
  nombre: string;
  direccion: string;
  activo: boolean;
  restaurante_id: number;
  restaurante?: {
    id: number;
    nombre: string;
  };
}

interface SucursalListProps {
  sucursales: Sucursal[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function SucursalList({ sucursales, onToggle, onDelete }: SucursalListProps) {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 4,
        backgroundColor: "background.paper",
        boxShadow: "0px 5px 15px rgba(255, 215, 0, 0.3)",
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "primary.main" }}>
            <TableCell sx={{ color: "secondary.main", fontWeight: "bold" }}>Nombre</TableCell>
            <TableCell sx={{ color: "secondary.main", fontWeight: "bold" }}>Dirección</TableCell>
            <TableCell sx={{ color: "secondary.main", fontWeight: "bold" }}>Restaurante</TableCell>
            <TableCell sx={{ color: "secondary.main", fontWeight: "bold" }}>Activo</TableCell>
            <TableCell sx={{ color: "secondary.main", fontWeight: "bold" }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sucursales.map((suc) => (
            <TableRow key={suc.id}>
              <TableCell><RestaurantIcon sx={{ mr: 1, color: "secondary.main" }} /> {suc.nombre}</TableCell>
              <TableCell><RoomIcon sx={{ mr: 1, color: "primary.light" }} /> {suc.direccion}</TableCell>
              <TableCell>{suc.restaurante?.nombre ?? "Centro"}</TableCell>
              <TableCell><Switch checked={suc.activo} onChange={() => onToggle(suc.id)} /></TableCell>
              <TableCell><IconButton color="error" onClick={() => onDelete(suc.id)}><DeleteIcon /></IconButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
 