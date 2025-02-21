import React, { useState } from "react";
import { Paper, Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface Restaurante {
  id: number;
  nombre: string;
}

interface SucursalFormProps {
  restaurantes: Restaurante[];
  onCreate: (data: { nombre: string; direccion: string; restaurante_id: number }) => void;
}

export default function SucursalForm({ restaurantes, onCreate }: SucursalFormProps) {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [restauranteId, setRestauranteId] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !direccion || restauranteId === "") return;

    onCreate({ nombre, direccion, restaurante_id: Number(restauranteId) });

    setNombre("");
    setDireccion("");
    setRestauranteId("");
  };

  return (
    <Paper
      sx={{
        p: 4,
        mb: 3,
        borderRadius: 5,
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
        background: "rgba(255, 255, 255, 0.1)", // Fondo translúcido
        backdropFilter: "blur(15px)", // Efecto vidrio
        border: "1px solid rgba(255, 255, 255, 0.3)",
      }}
    >
      <Typography variant="h5" align="center" sx={{ fontWeight: "bold", color: "secondary.main" }}>
        🍷 Registrar Sucursal
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        <TextField
          label="Nombre *"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          InputProps={{ sx: { color: "black" } }}
        />

        <TextField
          label="Dirección *"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
          InputProps={{ sx: { color: "black" } }}
        />

        <FormControl fullWidth>
          <InputLabel sx={{ color: "secondary.main" }}>Seleccione un restaurante</InputLabel>
          <Select value={restauranteId} onChange={(e) => setRestauranteId(e.target.value as number)} required sx={{ color: "black" }}>
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

        <Button
          variant="contained"
          type="submit"
          sx={{
            bgcolor: "secondary.main",
            color: "black",
            fontSize: 16,
            borderRadius: 20,
            "&:hover": { bgcolor: "#B8860B" },
          }}
        >
          ✨ REGISTRAR SUCURSAL
        </Button>
      </Box>
    </Paper>
  );
}
