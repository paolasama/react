import React, { useState, useEffect } from "react";
import {
  Paper,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";

interface Restaurante {
  id: number;
  nombre: string;
}

interface Sucursal {
  id: number;
  nombre: string;
  restaurante_id: number;
}

interface NuevaMesaData {
  numeroMesa: number;
  capacidad: number;
  estado: string;
  activo: boolean;
  restauranteId: number;
  sucursalId: number;
}

interface MesaFormProps {
  onSubmit: (data: NuevaMesaData) => void;
}

export default function MesaForm({ onSubmit }: MesaFormProps) {
  const [numeroMesa, setNumeroMesa] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [estado, setEstado] = useState("Libre");
  const [activo, setActivo] = useState(true);
  const [selectedRestaurante, setSelectedRestaurante] = useState<number | "">("");
  const [selectedSucursal, setSelectedSucursal] = useState<number | "">("");
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);

  const API_BASE_URL = "http://localhost:3000/api";

  useEffect(() => {
    axios.get(`${API_BASE_URL}/restaurantes`).then((res) => setRestaurantes(res.data));
    axios.get(`${API_BASE_URL}/sucursales`).then((res) => setSucursales(res.data));
  }, []);

  const sucursalesFiltradas =
    selectedRestaurante === "" ? sucursales : sucursales.filter((s) => s.restaurante_id === Number(selectedRestaurante));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!numeroMesa || !capacidad || !selectedRestaurante || !selectedSucursal) return;

    onSubmit({
      numeroMesa: Number(numeroMesa),
      capacidad: Number(capacidad),
      estado,
      activo,
      restauranteId: Number(selectedRestaurante),
      sucursalId: Number(selectedSucursal),
    });

    setNumeroMesa("");
    setCapacidad("");
    setEstado("Libre");
    setActivo(true);
    setSelectedRestaurante("");
    setSelectedSucursal("");
  };

  return (
    <Paper
      sx={{
        p: 4,
        mb: 3,
        borderRadius: 4,
        boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.3)",
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <Typography variant="h5" align="center" sx={{ fontWeight: "bold", color: "secondary.main" }}>
        🍷 Gestión de Mesas
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        <TextField label="Número de Mesa *" type="number" value={numeroMesa} onChange={(e) => setNumeroMesa(e.target.value)} required />

        <TextField label="Capacidad *" type="number" value={capacidad} onChange={(e) => setCapacidad(e.target.value)} required />

        <FormControl fullWidth>
          <InputLabel>Estado</InputLabel>
          <Select value={estado} onChange={(e) => setEstado(e.target.value)}>
            <MenuItem value="Libre">Libre</MenuItem>
            <MenuItem value="Ocupada">Ocupada</MenuItem>
            <MenuItem value="Reservada">Reservada</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Restaurante</InputLabel>
          <Select value={selectedRestaurante} onChange={(e) => setSelectedRestaurante(e.target.value as number)}>
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

        <FormControl fullWidth>
          <InputLabel>Sucursal</InputLabel>
          <Select value={selectedSucursal} onChange={(e) => setSelectedSucursal(e.target.value as number)}>
            <MenuItem value="">
              <em>-- Seleccionar --</em>
            </MenuItem>
            {sucursalesFiltradas.map((suc) => (
              <MenuItem key={suc.id} value={suc.id}>
                {suc.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControlLabel control={<Switch checked={activo} onChange={() => setActivo(!activo)} />} label="Activo" />

        <Button variant="contained" type="submit" sx={{ bgcolor: "secondary.main", color: "black", borderRadius: 20 }}>
          ✨ REGISTRAR MESA
        </Button>
      </Box>
    </Paper>
  );
}
