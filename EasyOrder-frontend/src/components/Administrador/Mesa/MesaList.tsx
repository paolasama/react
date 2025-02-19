import { Paper, Table, TableHead, TableBody, TableRow, TableCell, Switch, Button } from "@mui/material";

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
    <Paper
      sx={{
        p: 3,
        borderRadius: 4,
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
        overflowX: "auto",
      }}
    >
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ bgcolor: "#D4AF37" }}>
            <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Número</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Capacidad</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Estado</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Activo</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Restaurante</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Sucursal</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mesas.map((mesa) => (
            <TableRow key={mesa.id} sx={{ "&:hover": { bgcolor: "#fafafa" } }}>
              <TableCell>{mesa.numero_mesa}</TableCell>
              <TableCell>{mesa.capacidad}</TableCell>
              <TableCell>{mesa.estado}</TableCell>
              <TableCell>
                <Switch
                  checked={mesa.activo}
                  onChange={() => onToggle(mesa.id)}
                  color="primary"
                />
              </TableCell>
              <TableCell>{mesa.restaurante?.nombre ?? "N/A"}</TableCell>
              <TableCell>{mesa.sucursal?.nombre ?? "N/A"}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#007bff",
                    color: "white",
                    fontWeight: "bold",
                    "&:hover": { bgcolor: "#0056b3" },
                  }}
                  onClick={() => onEdit(mesa.id)}
                >
                  EDITAR
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
