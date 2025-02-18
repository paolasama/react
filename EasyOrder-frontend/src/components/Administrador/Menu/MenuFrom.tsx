// src/components/Administrador/Menu/MenuForm.tsx
import React, { useState } from "react";
import {
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

// Tipo local para la data del formulario
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

function MenuForm({ onCreate, sucursales }: MenuFormProps) {
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

    // Limpiar formulario
    setNombre("");
    setActivo(true);
    setSucursalId("");
    setRestauranteId(1);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Registrar nuevo menú
      </Typography>

      <TextField
        label="Nombre del Menú *"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Sucursal</InputLabel>
        <Select
          label="Sucursal"
          value={sucursalId}
          onChange={(e) => setSucursalId(e.target.value as number | "")}
        >
          <MenuItem value="">-- Seleccione una sucursal --</MenuItem>
          {sucursales.map((suc) => (
            <MenuItem key={suc.id} value={suc.id}>
              {suc.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Switch
            checked={activo}
            onChange={(e) => setActivo(e.target.checked)}
          />
        }
        label="Activo"
        sx={{ mb: 2 }}
      />

      <Button variant="contained" color="primary" type="submit" fullWidth>
        REGISTRAR MENÚ
      </Button>
    </Box>
  );
}

export default MenuForm;
