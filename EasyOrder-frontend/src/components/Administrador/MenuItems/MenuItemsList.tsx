import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Switch,
  CircularProgress,
  Typography,
  Alert,
  Box,
} from "@mui/material";

/** Tipo local para la tabla */
interface MenuItem {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria?: {
    id: number;
    nombre: string;
  };
  activo: boolean;
}

/** Props del componente */
interface MenuItemListProps {
  items: MenuItem[];
  loading: boolean;
  error: boolean;
  onToggle: (id: number) => void; // Función para togglear
}

export default function MenuItemList({
  items,
  loading,
  error,
  onToggle,
}: MenuItemListProps) {
  return (
    <Paper
      sx={{
        p: 4,
        mt: 3,
        borderRadius: 6,
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        color="primary"
        sx={{ mb: 3, fontFamily: "Poppins, sans-serif" }}
      >
        📜 Lista de Ítems del Menú
      </Typography>

      {/* Muestra mensaje de error si la API falla */}
      {error && <Alert severity="error">❌ No se pudieron cargar los ítems.</Alert>}

      {/* Muestra un spinner mientras carga */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Cargando ítems...</Typography>
        </Box>
      )}

      {/* Muestra mensaje si no hay ítems */}
      {!loading && !error && items.length === 0 && (
        <Typography
          variant="body1"
          textAlign="center"
          fontStyle="italic"
          sx={{ color: "#666" }}
        >
          No hay ítems disponibles.
        </Typography>
      )}

      {/* Tabla de ítems cuando hay datos */}
      {!loading && !error && items.length > 0 && (
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold", color: "#444" }}>
                🍽️ Nombre
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#444" }}>
                📖 Descripción
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#444" }}>
                💰 Precio
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#444" }}>
                📂 Categoría
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#444" }}>
                ✅ Activo
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow
                key={item.id}
                sx={{
                  "&:hover": { bgcolor: "#f9f9f9" },
                  transition: "background 0.3s ease",
                }}
              >
                <TableCell sx={{ fontWeight: "500" }}>
                  {item.nombre}
                </TableCell>
                <TableCell sx={{ fontStyle: "italic", color: "#666" }}>
                  {item.descripcion}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#2E7D32" }}>
                  ${item.precio.toFixed(2)}
                </TableCell>
                <TableCell sx={{ fontWeight: "500", color: "#555" }}>
                  {item.categoria ? item.categoria.nombre : "Sin categoría"}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={item.activo}
                    onChange={() => onToggle(item.id)} // <-- Llamamos a onToggle
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#43A047",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: "#43A047",
                      },
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}
