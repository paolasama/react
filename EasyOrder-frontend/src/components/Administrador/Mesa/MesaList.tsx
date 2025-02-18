// src/components/Administrador/Mesa/MesaList.tsx
import { Paper, Table, TableHead, TableBody, TableRow, TableCell, Button, Switch } from "@mui/material";

interface Mesa {
  id: number;
  numero_mesa: number;
  capacidad: number;
  estado: string;
  activo: boolean;
  restaurante?: { id: number; nombre: string };
  sucursal?: { id: number; nombre: string };
}

interface MesaListProps {
  mesas: Mesa[];
  onToggle: (id: number) => void;
  onEdit: (id: number) => void;
}

export default function MesaList({ mesas, onToggle, onEdit }: MesaListProps) {
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Número</TableCell>
            <TableCell>Capacidad</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Activo</TableCell>
            <TableCell>Restaurante</TableCell>
            <TableCell>Sucursal</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mesas.map((mesa) => (
            <TableRow key={mesa.id}>
              <TableCell>{mesa.numero_mesa}</TableCell>
              <TableCell>{mesa.capacidad}</TableCell>
              <TableCell>{mesa.estado}</TableCell>
              <TableCell>
                <Switch
                  checked={mesa.activo}
                  onChange={() => onToggle(mesa.id)}
                />
              </TableCell>
              <TableCell>{mesa.restaurante?.nombre ?? "N/A"}</TableCell>
              <TableCell>{mesa.sucursal?.nombre ?? "N/A"}</TableCell>
              <TableCell>
                <Button variant="contained" onClick={() => onEdit(mesa.id)}>
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
