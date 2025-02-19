import React, { useState } from "react";
import {
  Paper,
  Box,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

interface Sucursal {
  id: number;
  nombre: string;
}

interface MenuFormData {
  nombre: string;
  activo: boolean;
  restaurante_id: number;
  sucursal_id: number | null;
}

interface MenuFormProps {
  onCreate: (data: MenuFormData) => void;
  sucursales: Sucursal[];
}

export default function MenuForm({ onCreate, sucursales }: MenuFormProps) {
  const [nombre, setNombre] = useState("");
  const [activo, setActivo] = useState(true);
  const [sucursalId, setSucursalId] = useState<number | "">("");
  const [restauranteId, setRestauranteId] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data: MenuFormData = {
      nombre,
      activo,
      restaurante_id: restauranteId,
      sucursal_id: sucursalId === "" ? null : Number(sucursalId),
    };
    onCreate(data);

    setNombre("");
    setActivo(true);
    setSucursalId("");
    setRestauranteId(1);
  };

  return (
    <Paper
      sx={{
        p: 2, // Reducir padding
        mb: 2, // Reducir margen
        borderRadius: 3,
        boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)",
        background: "#fff",
        maxWidth: "50px", // Ancho más pequeño
        mx: "auto", // Centrar
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        textAlign="center"
        color="primary"
        sx={{ mb: 1 }}
      >
        📋 Registrar Menú
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <TextField
          label="Nombre *"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
          required
          size="small" // Hace el campo más pequeño
        />

        <FormControl fullWidth size="small">
          <InputLabel>Sucursal</InputLabel>
          <Select value={sucursalId} onChange={(e) => setSucursalId(e.target.value as number | "")}>
            <MenuItem value="">-- Seleccionar --</MenuItem>
            {sucursales.map((suc) => (
              <MenuItem key={suc.id} value={suc.id}>
                {suc.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControlLabel
          control={<Switch checked={activo} onChange={(e) => setActivo(e.target.checked)} color="primary" />}
          label="Activo"
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            fontWeight: "bold",
            fontSize: "0.875rem", // Texto más pequeño
            py: 1, // Padding vertical reducido
          }}
        >
          ✅ Registrar
        </Button>
      </Box>
    </Paper>
  );
}
