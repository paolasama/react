// src/components/Administrador/MenuItems/MenuItemForm.tsx
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
  Typography
} from "@mui/material";
import axios from "axios";

interface Categoria {
  id: number;
  nombre: string;
}

export interface MenuItemFormData {
  nombre: string;
  descripcion: string;
  precio: number;
  categoriaId: number;
  activo: boolean;
  imagen?: File;
}

interface MenuItemFormProps {
  onSubmit: (nuevoItem: MenuItemFormData) => void;
}

export default function MenuItemForm({ onSubmit }: MenuItemFormProps) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  // Ahora usamos "number | null" en vez de "number | ''"
  const [categoriaId, setCategoriaId] = useState<number | null>(null);
  const [activo, setActivo] = useState(true);
  const [imagen, setImagen] = useState<File | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/categorias")
      .then(res => setCategorias(res.data))
      .catch(err => console.error("Error al cargar categorías:", err));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !descripcion.trim() || !precio.trim() || categoriaId === null) {
      return;
    }

    const data: MenuItemFormData = {
      nombre,
      descripcion,
      precio: Number(precio),
      categoriaId,
      activo,
      imagen: imagen || undefined
    };

    onSubmit(data);

    // Limpiar formulario
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setCategoriaId(null);
    setActivo(true);
    setImagen(null);
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" fontWeight="bold" textAlign="center" color="primary" gutterBottom>
        Gestión de Menú Items
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Nombre *"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <TextField
          label="Descripción *"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          multiline
          rows={2}
        />

        <TextField
          label="Precio *"
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />

        <FormControl fullWidth>
          <InputLabel>Seleccione una categoría</InputLabel>
          <Select
            label="Seleccione una categoría"
            // Si categoriaId es null, mostramos ""
            value={categoriaId === null ? "" : categoriaId}
            onChange={(e) => {
              // Si e.target.value es "", entonces no eligieron nada => null
              if (e.target.value === "") {
                setCategoriaId(null);
              } else {
                setCategoriaId(Number(e.target.value));
              }
            }}
          >
            <MenuItem value="">Seleccione una categoría</MenuItem>
            {categorias.map(cat => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControlLabel
          control={<Switch checked={activo} onChange={() => setActivo(!activo)} />}
          label="Activo"
        />

        <Typography variant="body2">Seleccionar imagen</Typography>
        <input
          type="file"
          onChange={(e) => setImagen(e.target.files ? e.target.files[0] : null)}
        />

        <Button variant="contained" type="submit">
          Registrar Menú Item
        </Button>
      </Box>
    </Paper>
  );
}
