import { Paper, Table, TableHead, TableBody, TableRow, TableCell, Switch, CircularProgress, Typography, Alert, Box } from "@mui/material";

interface MenuItem {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  activo: boolean;
}

interface MenuItemListProps {
  items: MenuItem[];
  loading: boolean;
  error: boolean;
  onToggle: (id: number) => void;
}

export default function MenuItemList({ items, loading, error, onToggle }: MenuItemListProps) {
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" textAlign="center" gutterBottom>
        Lista de menú items
      </Typography>

      {error && <Alert severity="error">❌ No se pudieron cargar los ítems.</Alert>}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Cargando ítems...</Typography>
        </Box>
      )}

      {!loading && !error && items.length === 0 && (
        <Typography variant="body1" textAlign="center">
          No hay ítems disponibles.
        </Typography>
      )}

      {!loading && !error && items.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Activo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.nombre}</TableCell>
                <TableCell>{item.descripcion}</TableCell>
                <TableCell>${item.precio}</TableCell>
                <TableCell>{item.categoria}</TableCell>
                <TableCell>
                  <Switch checked={item.activo} onChange={() => onToggle(item.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}
