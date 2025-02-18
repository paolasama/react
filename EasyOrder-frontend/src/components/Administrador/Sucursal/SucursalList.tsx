import { Paper, Table, TableHead, TableBody, TableRow, TableCell, Switch, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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
    <Paper sx={{ p: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Dirección</TableCell>
            <TableCell>Restaurante</TableCell>
            <TableCell>Activo</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sucursales.map((suc) => (
            <TableRow key={suc.id}>
              <TableCell>{suc.nombre}</TableCell>
              <TableCell>{suc.direccion}</TableCell>
              <TableCell>
                {/* Muestra el nombre del restaurante (si viene anidado) */}
                {suc.restaurante?.nombre ?? "centro"}
              </TableCell>
              <TableCell>
                <Switch
                  checked={suc.activo}
                  onChange={() => onToggle(suc.id)}
                />
              </TableCell>
              <TableCell>
                <IconButton color="error" onClick={() => onDelete(suc.id)}>
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
