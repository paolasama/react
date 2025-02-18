import React, { useState } from "react";
import { Paper, Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface Restaurante {
  id: number;
  nombre: string;
}

interface SucursalFormProps {
  restaurantes: Restaurante[]; // Lista de restaurantes para el select
  onCreate: (data: { nombre: string; direccion: string; restaurante_id: number }) => void;
}

export default function SucursalForm({ restaurantes, onCreate }: SucursalFormProps) {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [restauranteId, setRestauranteId] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !direccion || restauranteId === "") return;

    onCreate({
      nombre,
      direccion,
      restaurante_id: Number(restauranteId),
    });

    // Limpiar formulario
    setNombre("");
    setDireccion("");
    setRestauranteId("");
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" fontWeight="bold" textAlign="center" color="primary">
        Registrar Sucursal
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        <TextField
          label="Nombre *"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <TextField
          label="Dirección *"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
        />

        <FormControl fullWidth>
          <InputLabel>Seleccione un restaurante</InputLabel>
          <Select
            value={restauranteId}
            onChange={(e) => setRestauranteId(e.target.value as number)}
            required
          >
            <MenuItem value="">
              <em>-- Seleccionar --</em>
            </MenuItem>
            {restaurantes.map((rest) => (
              <MenuItem key={rest.id} value={rest.id}>
                {rest.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" type="submit">
          REGISTRAR SUCURSAL
        </Button>
      </Box>
    </Paper>
  );
}
